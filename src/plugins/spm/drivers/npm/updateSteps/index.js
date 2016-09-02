import checkUpdateExists from './checkUpdateExists'
import updatePackageJSON from './updatePackageJSON'
import nukeNodeModulesFolder from './nukeNodeModulesFolder'
import removeFromMemory from './removeFromMemory'
import npmInstall from './npmInstall'
import registerInPluginManager from './registerInPluginManager'

const steps = [
  checkUpdateExists,
  updatePackageJSON,
  nukeNodeModulesFolder,
  removeFromMemory,
  npmInstall,
  registerInPluginManager
].reverse()

export default steps
