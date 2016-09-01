import removeFromConfigFile from './removeFromConfigFile'
import removeFromMemory from './removeFromMemory'

const steps = [
  removeFromConfigFile,
  removeFromMemory
].reverse()

export default steps
