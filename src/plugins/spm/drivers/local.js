import checkPackageJSON from '../sharedSteps/checkPackageJSON'
import checkLocationPath from '../sharedSteps/checkLocationPath'
import checkPluginExists from './local/checkPluginExists'
import linkPlugin from './local/linkPlugin'

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
      checkPluginExists,
      linkPlugin
    ]
  }
}

