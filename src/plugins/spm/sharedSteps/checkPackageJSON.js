import {readFileSync} from 'fs'
import path from 'path'

export default {
  label: 'Package.json check',
  cb ({ chain, appendToOutput, failed }) {
    return chain
      .then((filePath) => {
        const pckg = JSON.parse(readFileSync(path.resolve(filePath, 'package.json'), 'utf8'))
        const mandatoryKeywords = ['smithers', 'plugin']

        appendToOutput(`- checking if package.json file has [${mandatoryKeywords.join(', ')}] as one of the keywords`)

        if (!mandatoryKeywords.every(keyword => (pckg.keywords || []).includes(keyword))) {
          failed(`\n - it does not contain one of the mandatory keywords: [${mandatoryKeywords.join(', ')}]`)
        }

        return filePath
      })
  }
}
