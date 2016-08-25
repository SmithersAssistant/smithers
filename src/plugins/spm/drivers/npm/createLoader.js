import {resolve} from 'path'
import {writeFile} from 'fs'

export default function createLoader (input, robot) {
  return {
    label: 'Create magic package loader',
    cb ({ chain, appendToOutput }) {
      return chain
        .then(({ path, plugin }) => {
          appendToOutput('Writing magic file: ')
          const magicFile = resolve(path, 'index.js')
          appendToOutput(magicFile)

          return new Promise((resolve, reject) => {
            writeFile(magicFile, [
              `var obj = require('${plugin.name}');`,
              'module.exports = obj && obj.__esModule ? obj : { default: obj };'
            ].join('\n\n'), (err) => err ? reject(err) : resolve(plugin))
          })
        })
    }
  }
}
