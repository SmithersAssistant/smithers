import config from 'config'

export default function checkAlreadyExists (input, robot) {
  return {
    label: 'Check if already installed',
    cb ({ chain, failed }) {
      return chain
        .then(({ moduleName, ...other }) => {
          const plugin = config.get('plugins.external', []).find(plugin => plugin === moduleName)

          if (plugin) {
            failed(`Plugin ${plugin} already exists`)
          }

          return {
            ...other,
            moduleName
          }
        })
    }
  }
}
