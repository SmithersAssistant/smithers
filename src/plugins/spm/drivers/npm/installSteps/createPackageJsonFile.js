import {resolve} from 'path'
import {writeFile} from 'fs'

export default function createPackageJsonFile (input, robot) {
  return {
    label: 'Create package.json file',
    cb ({ chain, appendToOutput }) {
      return chain
        .then(({ moduleName, moduleVersion, path }) => {
          appendToOutput('Creating custom package.json file: ')
          const packageJson = JSON.stringify({
            name: `plugin-${moduleName}`,
            dependencies: {},
            private: true
          }, null, '  ')

          appendToOutput(`\n\n${packageJson}\n\n`)
          appendToOutput('Writing package.json file to: ')
          const packageJsonPath = resolve(path, 'package.json')
          appendToOutput(packageJsonPath)

          return new Promise((resolve, reject) => {
            writeFile(packageJsonPath, packageJson, (err) => err ? reject(err) : resolve({
              moduleName, moduleVersion, path
            }))
          })
        })
    }
  }
}
