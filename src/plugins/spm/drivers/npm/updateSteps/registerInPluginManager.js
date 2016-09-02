import pluginManager from 'pluginSystem/pluginManager'

export default function registerInPluginManager (input, robot) {
  return {
    label: 'Register plugin in plugin manager',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((plugin) => {
          appendToOutput('Registering plugin in the plugin manager')

          pluginManager.register(plugin, pluginManager.loadPlugin(plugin.location))

          return plugin
        })
    }
  }
}
