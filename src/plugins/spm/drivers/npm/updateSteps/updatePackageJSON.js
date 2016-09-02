import {readFileSync, writeFile} from 'fs'
import {resolve} from 'path'

export default function updatePackageJSON (input, robot) {
  return {
    label: 'Update Package.json',
    cb ({ chain, appendToOutput }) {
      return chain
        .then(({plugin, version}) => {
          appendToOutput('Updating the version inside the package.json file')

          const resolvedPath = resolve(plugin.location, 'package.json')
          const pckg = JSON.parse(readFileSync(resolvedPath, 'utf8'))

          appendToOutput(`\nFrom:\n\n${JSON.stringify(pckg, null, '  ')}\n\n`)

          pckg.version = version
          pckg.dependencies[plugin.name] = version
          plugin.version = version

          appendToOutput(`\nTo:\n\n${JSON.stringify(pckg, null, '  ')}\n\n`)

          return new Promise((resolve, reject) => {
            writeFile(resolvedPath, JSON.stringify(pckg, null, '  '), (err) => err
              ? reject(err)
              : resolve(plugin)
            )
          })
        })
    }
  }
}
