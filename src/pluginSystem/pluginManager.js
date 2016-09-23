import { resolve } from 'path'
import flatten from 'lodash/flatten'
import Plugin from './Plugin'

import { DEFAULT_PLUGIN, EXTERNAL_PLUGIN } from './sources'

class PluginManager {

  constructor () {
    this.plugins = []
  }

  removePlugin (module) {
    this.plugins = this.plugins.map(plugin => {
      if (plugin.location === module.location) {
        return null
      }

      return plugin
    }).filter(x => !!x)
  }

  loadPlugin (path) {
    try {
      return window.require(resolve(path))
    } catch (err) {
      console.error(err)
      return null
    }
  }

  register (info, cb) {
    if (!cb) {
      console.error([
        'COULD NOT LOAD PLUGIN',
        `name: ${info.name}`,
        `version: ${info.version}`
      ].join('\n  '))
      return
    }

    if ('default' in cb) {
      cb = cb.default
    }

    this.plugins = [
      ...this.plugins,
      new Plugin(info, cb)
    ]
  }

  execute (command) {
    this.plugins.forEach(plugin => plugin.execute(command))
  }

  canShareCard (name) {
    const plugin = this.plugins.find(plugin => plugin.cards.find(card => card.name === name))

    // Local plugins are not allowed to be shared
    // Because there is no way to "install" it if it doesn't exist
    return [
      DEFAULT_PLUGIN,
      EXTERNAL_PLUGIN
    ].includes(plugin.source)
  }

  resolveComponent (name) {
    try {
      const card = flatten(this.plugins.map(plugin => plugin.cards)).find(c => c.name === name)
      if (card) {
        return card.component
      }

      return undefined
    } catch (err) {
      console.error(`The plugin '${name}' could not be loaded.`)
      return undefined
    }
  }

  list () {
    return this.plugins
  }
}

export default new PluginManager()
