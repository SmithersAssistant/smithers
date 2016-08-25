import {resolve} from 'path'
import config from 'config'
import mkdirp from 'mkdirp'
import npmi from 'npmi'

export default function preparing (input, robot) {
  return {
    label: 'Setting up the world',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((module) => {
          appendToOutput(`Loaded NPM Version: ${npmi.NPM_VERSION}`)

          appendToOutput('\nExtracting module name and version from input')
          const [moduleName, moduleVersion = 'latest'] = module.split('@')
          appendToOutput(`\n\n - Module: ${moduleName}\n - Module Version: ${moduleVersion}\n\n`)

          appendToOutput('Creating destination Path: ')
          const basePath = config.getExternalPluginsPath()
          const path = resolve(basePath, moduleName)
          appendToOutput(path)

          return new Promise((resolve, reject) => {
            mkdirp(path, (err) => err ? reject(err) : resolve({
              moduleName, moduleVersion, path
            }))
          })
        })
    }
  }
}
