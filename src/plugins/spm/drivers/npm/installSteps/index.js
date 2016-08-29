import preparing from './preparing'
import checkAlreadyExists from './checkAlreadyExists'
import createPackageJsonFile from './createPackageJsonFile'
import npmInstall from './npmInstall'
import checkPackageJSON from './checkPackageJSON'
import writeDependenciesToPackageJson from './writeDependenciesToPackageJson'
import registerInConfigFile from './registerInConfigFile'
import createLoader from './createLoader'
import registerInPluginManager from './registerInPluginManager'

export default [
  preparing,
  checkAlreadyExists,
  createPackageJsonFile,
  npmInstall,
  checkPackageJSON,
  writeDependenciesToPackageJson,
  registerInConfigFile,
  createLoader,
  registerInPluginManager
]
