import {resolve} from 'path'
import config from 'config'
import pluginManager from 'pluginSystem/pluginManager'
import {EXTERNAL_PLUGIN} from 'pluginSystem/sources'

export default function registerInPluginManager (input, robot) {
  return {
    label: 'Register plugin in plugin manager',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((plugin) => {
          appendToOutput('Registering plugin in the plugin manager')
          const location = resolve(config.getExternalPluginsPath(), plugin.name)

          pluginManager.register({
            ...plugin,
            version: window.require(resolve(location, 'package.json')).version,
            location,
            source: EXTERNAL_PLUGIN
          }, pluginManager.loadPlugin(location))

          return plugin
        })
    }
  }
}
