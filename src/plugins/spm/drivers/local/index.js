import {LOCAL_PLUGIN} from 'pluginSystem/sources'
import installSteps from './installSteps'
import uninstallSteps from './uninstallSteps'

export default function local (input, robot) {
  return {
    label: 'local',
    handles: [LOCAL_PLUGIN],
    test () {
      // if it starts with a / => /plugins/mkj it is probably a linux/mac path
      // if it starts with *:\\ => C:\\some\\path it is probably a windows path
      return input.startsWith('/') || input.startsWith(':\\', 1)
    },
    installSteps,
    uninstallSteps
  }
}

