import config from 'config'

export default function checkAlreadyExists (input, robot) {
  return {
    label: 'Check if already installed',
    cb ({ chain, appendToOutput, failed }) {
      return chain
        .then(({ moduleName, ...other }) => {
          const plugin = config.get('plugins.external', []).find(plugin => plugin === moduleName)

          if (plugin) {
            failed(`Plugin ${plugin} already exists`)
          }

          appendToOutput('Does not exist yet, continue')

          return {
            ...other,
            moduleName
          }
        })
    }
  }
}
