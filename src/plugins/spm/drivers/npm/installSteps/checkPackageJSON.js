import {readFileSync} from 'fs'
import {resolve} from 'path'
import validatePackageJSON from './_validatePackageJSON'

export default {
  label: 'Package.json check',
  cb ({ chain, appendToOutput, failed }) {
    return chain
      .then(({ path: filePath, module, ...other }) => {
        const [moduleName] = module.split('@')
        const resolvedPath = resolve(filePath, 'node_modules', moduleName, 'package.json')

        const pckg = JSON.parse(readFileSync(resolvedPath, 'utf8'))

        return validatePackageJSON(pckg, {
          appendToOutput,
          failed,
          filePath
        })
          .then(() => {
            return {
              path: filePath,
              module,
              ...other
            }
          })
      })
  }
}
