import checkLocationPath from './checkLocationPath'
import checkPackageJSON from './checkPackageJSON'
import checkPluginExists from './checkPluginExists'
import linkPlugin from './linkPlugin'

const steps = [
  checkLocationPath,
  checkPackageJSON,
  checkPluginExists,
  linkPlugin
].reverse()

export default steps
