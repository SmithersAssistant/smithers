import config from 'config'

export default {
  label: 'Remove from config file',
  cb ({ chain, appendToOutput }) {
    return chain
      .then((plugin) => {
        appendToOutput('Removing from config file...')
        config.set('plugins.local', config.get('plugins.local').filter(p => p.location !== plugin.location))

        return plugin
      })
  }
}
