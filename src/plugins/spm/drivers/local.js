import fs from 'fs'
import path from 'path'
import {
  LOCAL_PLUGIN
} from 'pluginSystem/sources'

export default function local (input, robot) {
  return {
    label: 'local',
    test () {
      // if it starts with a / => /plugins/mkj it is probably a linux/mac path
      // if it starts with *:\\ => C:\\some\\path it is probably a windows path
      return input.startsWith('/') || input.startsWith(':\\', 1)
    },
    steps: [
      {
        label: 'Checking location path',
        cb ({ chain, done, appendToOutput, failed }) {
          return chain
            .then(() => {
              appendToOutput('determining if it is a valid location')

              if (!fs.existsSync(input)) {
                failed('\n - Plugin path does not exist')
              } else if (!fs.statSync(input).isDirectory()) {
                failed('\n - Plugin path is not a directory')
              } else if (!fs.existsSync(path.resolve(input, 'package.json'))) {
                failed('\n - Plugin path does not have a package.json file')
              }

              appendToOutput([
                ' - Path does exists',
                ' - Path is a directory',
                ' - Path does contain package.json'
              ].join('\n'))
            })
            .then(done)
        }
      },
      {
        label: 'Package.json check',
        cb ({ chain, done, appendToOutput, failed }) {
          return chain
            .then(() => {
              const pckg = JSON.parse(fs.readFileSync(path.resolve(input, 'package.json'), 'utf8'))
              const mandatoryKeywords = ['smithers', 'plugin']

              appendToOutput(`- checking if package.json file has [${mandatoryKeywords.join(', ')}] as one of the keywords`)

              if (!mandatoryKeywords.every(keyword => (pckg.keywords || []).includes(keyword))) {
                failed(`\n - it does not contain one of the mandatory keywords: [${mandatoryKeywords.join(', ')}]`)
              }
            })
            .then(done)
        }
      }
    ]
  }
}

