import config from 'config'

export default function registerInConfigFile (input, robot) {
  return {
    label: 'Register plugin in config file',
    cb ({ chain, appendToOutput }) {
      return chain
        .then(({ path, plugin }) => {
          appendToOutput('Registering it in the config file')
          config.set('plugins.external', [
            ...config.get('plugins.external'),
            plugin.name
          ])

          return {
            path,
            plugin
          }
        })
    }
  }
}
