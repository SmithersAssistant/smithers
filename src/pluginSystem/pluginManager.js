import {resolve} from 'path'
import Plugin from './Plugin'

class PluginManager {

  constructor () {
    this.cards = []
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

  registerComponent (component, name) {
    this.cards = [
      ...this.cards,
      {
        component,
        name
      }
    ]
  }

  resolveComponent (name) {
    try {
      const card = this.cards.find(c => c.name === name)
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
