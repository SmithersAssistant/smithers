import install from './spm/install'
import uninstall from './spm/uninstall'
import update from './spm/update'

// SPM: Smithers Package/Plugin Manager
export default robot => {
  install(robot)
  uninstall(robot)
  update(robot)
}
