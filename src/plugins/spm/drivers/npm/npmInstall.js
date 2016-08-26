import co from 'co'
import npminstall from 'npminstall'
import {resolve} from 'path'
import {readFileSync} from 'fs'

export default function npmInstall (input, robot) {
  return {
    label: 'NPM Install',
    cb ({ chain, appendToOutput }) {
      return chain
        .then(({ moduleName, moduleVersion = 'latest', path }) => {
          appendToOutput('Actually installing plugin')

          return co(function* () {
            yield npminstall({
              root: path,
              production: true,
              pkgs: [
                { name: moduleName, version: moduleVersion }
              ]
            })
          })
            .then(() => {
              const resolvedPath = resolve(path, 'node_modules', moduleName, 'package.json')
              const pckg = JSON.parse(readFileSync(resolvedPath, 'utf8'))

              return {
                module: `${moduleName}@${pckg.version}`,
                path
              }
            })
        })
    }
  }
}
