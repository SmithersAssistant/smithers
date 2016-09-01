import {EXTERNAL_PLUGIN} from 'pluginSystem/sources'
import installSteps from './installSteps'
import uninstallSteps from './uninstallSteps'
import updateSteps from './updateSteps'

export default function npm (input, robot) {
  return {
    label: 'npm',
    handles: [EXTERNAL_PLUGIN],
    test () {
      return !(
        input.startsWith('/') ||        // We don't want this, it is probably a linux/mac file path
        input.startsWith(':\\', 1) ||   // We don't want this, it is probably a windows file path
        input.startsWith('http://') ||  // We don't want this, it is probably a url
        input.startsWith('https://')    // We don't want this, it is probably a more secure url
      )
    },
    installSteps,
    uninstallSteps,
    updateSteps
  }
}

