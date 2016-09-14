import install from './spm/install'
import uninstall from './spm/uninstall'
import update from './spm/update'
import search from './spm/search'
import overview from './spm/overview'

// SPM: Smithers Package/Plugin Manager
export default robot => {
  install(robot)
  uninstall(robot)
  update(robot)
  search(robot)
  overview(robot)
}
