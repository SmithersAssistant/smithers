import {resolve} from 'path'
import {writeFile} from 'fs'
import {EXTERNAL_PLUGIN} from 'pluginSystem/sources'

export default function writeDependenciesToPackageJson (input, robot) {
  return {
    label: 'Save dependencies in package.json file',
    cb ({ chain, appendToOutput }) {
      return chain
        .then(({ path, module }) => {
          const [moduleName, moduleVersion] = module.split('@')
          appendToOutput('Updating package.json file')
          const packageJsonPath = resolve(path, 'package.json')
          const pckg = window.require(packageJsonPath)

          pckg.dependencies = {
            ...pckg.dependencies,
            [moduleName]: moduleVersion
          }
          pckg.version = moduleVersion

          const plugin = {
            name: moduleName,
            source: EXTERNAL_PLUGIN
          }

          return new Promise((resolve, reject) => {
            writeFile(packageJsonPath, JSON.stringify(pckg, null, '  '), err => {
              if (err) {
                reject(err)
              }
              resolve({path, plugin})
            })
          })
        })
    }
  }
}
