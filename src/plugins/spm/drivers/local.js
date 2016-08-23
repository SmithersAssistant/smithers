import config from 'config'
import {resolve} from 'path'
import pluginManager from 'pluginSystem/pluginManager'
import checkPackageJSON from '../sharedSteps/checkPackageJSON'
import checkLocationPath from '../sharedSteps/checkLocationPath'

import {
  LOCAL_PLUGIN
} from 'pluginSystem/sources'

export default function local (input, robot) {
  return {
    label: 'local',
    test () {
      // if it starts with a / => /plugins/mkj it is probably a linux/mac path
      // if it starts with *:\\ => C:\\some\\path it is probably a windows path
      return input.startsWith('/') || input.startsWith(':\\', 1)
    },
    installSteps: [
      checkLocationPath,
      checkPackageJSON,
      {
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
      },
      {
        label: 'Linking ',
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
    ]
  }
}

