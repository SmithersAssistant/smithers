import {readFileSync} from 'fs'
import path from 'path'
import rimraf from 'rimraf'

export default {
  label: 'Package.json check',
  cb ({ chain, appendToOutput, failed }) {
    return chain
      .then(({ path: filePath, ...other }) => {
        const pckg = JSON.parse(readFileSync(path.resolve(filePath, 'package.json'), 'utf8'))
        const mandatoryKeywords = ['smithers', 'plugin']

        appendToOutput(`- checking if package.json file has [${mandatoryKeywords.join(', ')}] as one of the keywords`)

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
          ...other
        }
      })
  }
}
