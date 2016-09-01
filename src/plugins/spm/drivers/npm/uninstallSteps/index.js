import removeFromConfigFile from './removeFromConfigFile'
import removeFolder from './removeFolder'
import removeFromMemory from './removeFromMemory'

const steps = [
  removeFromConfigFile,
  removeFolder,
  removeFromMemory
].reverse()

export default steps
