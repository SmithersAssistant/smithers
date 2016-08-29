import {
  LOCAL_PLUGIN
} from 'pluginSystem/sources'

export default function checkPluginExists (input, robot) {
  return {
    label: 'Check if plugin already exists',
    cb ({ chain, appendToOutput, failed }) {
      return chain
        .then((location) => {
          appendToOutput(`Checking if plugin '${location.trim().split(/[ /]/g).filter(x => !!x).pop()}' already exists`)

          const plugin = robot.plugins().find(plugin => {
            return plugin.location === location && plugin.source === LOCAL_PLUGIN
          })

          if (plugin) {
            failed(`\n - There is already a local plugin '${plugin.name}'`)
          }

          appendToOutput('\nPlugin does not exists yet, ready to be installed')

          return location
        })
    }
  }
}
