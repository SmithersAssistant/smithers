import fs from 'fs'
import path from 'path'

export default function checkLocationPath (input, robot) {
  return {
    label: 'Checking location path',
    cb ({ chain, appendToOutput, failed }) {
      return chain
        .then((locationPath = input) => {
          appendToOutput(`determining if '${locationPath}' is a valid location\n`)

          if (!fs.existsSync(locationPath)) {
            failed('\n - Plugin path does not exist')
          } else if (!fs.statSync(locationPath).isDirectory()) {
            failed('\n - Plugin path is not a directory')
          } else if (!fs.existsSync(path.resolve(locationPath, 'package.json'))) {
            failed('\n - Plugin path does not have a package.json file')
          }

          appendToOutput([
            ' - Path does exists',
            ' - Path is a directory',
            ' - Path does contain package.json'
          ].join('\n'))

          return locationPath
        })
    }
  }
}
