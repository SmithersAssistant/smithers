import {readFileSync} from 'fs'
import {resolve} from 'path'
import rimraf from 'rimraf'

export default {
  label: 'Package.json check',
  cb ({ chain, appendToOutput, failed }) {
    return chain
      .then(({ path: filePath, module, ...other }) => {
        const [moduleName] = module.split('@')
        const resolvedPath = resolve(filePath, 'node_modules', moduleName, 'package.json')

        const pckg = JSON.parse(readFileSync(resolvedPath, 'utf8'))
        const mandatoryKeywords = ['smithers', 'plugin']

        appendToOutput(`\n- checking if package.json file has [${mandatoryKeywords.join(', ')}] as one of the keywords`)

        if (!mandatoryKeywords.every(keyword => (pckg.keywords || []).includes(keyword))) {
          appendToOutput(`\n - Removing ${filePath}`)
          return new Promise((resolve, reject) => {
            rimraf(filePath, (err) => err ? reject(err) : resolve())
          })
            .then(() => {
              failed(`\n - it does not contain one of the mandatory keywords: [${mandatoryKeywords.join(', ')}]`)
            })
        }

        return {
          path: filePath,
          module,
          ...other
        }
      })
  }
}
