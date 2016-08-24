import config from 'config'
import {resolve} from 'path'
import pluginManager from 'pluginSystem/pluginManager'

import {
  LOCAL_PLUGIN
} from 'pluginSystem/sources'

export default function linkPlugin (input, robot) {
  return {
    label: 'Linking the location to installed plugins',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((location) => {
          appendToOutput('Fetching meta information')
          const meta = window.require(resolve(location, 'package.json'))

          appendToOutput('\nBuilding plugin object')
          const plugin = {
            name: meta.name,
            location,
            version: meta.version
          }

          appendToOutput(`\n\n${JSON.stringify(plugin, null, '  ')}\n`)

          appendToOutput('\nStoring plugin in config')
          config.set('plugins.local', [
            ...config.get('plugins.local'),
            plugin
          ])

          appendToOutput('\nRegistering plugin in the plugin manager')
          pluginManager.register({
            ...plugin,
            source: LOCAL_PLUGIN
          }, pluginManager.loadPlugin(location))

          return plugin
        })
    }
  }
}
