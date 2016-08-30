import config from 'config'

export default {
  label: 'Remove from config file',
  cb ({ chain, appendToOutput }) {
    return chain
      .then((plugin) => {
        appendToOutput('Removing from config file...')
        config.set('plugins.external', config.get('plugins.external').filter(p => p !== plugin.name))

        return plugin
      })
  }
}
