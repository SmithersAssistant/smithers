import validatePackageJSON from './_validatePackageJSON'

export default function npmInstall (input, robot) {
  return {
    label: 'Check the registry',
    cb ({ chain, failed, appendToOutput }) {
      return chain
        .then(({ moduleName, moduleVersion = 'latest', path, ...other }) => {
          return robot.fetchJson(`http://registry.npmjs.org/${moduleName}/${moduleVersion}`)
            .then((result) => {
              if (result.error === 'not_found') {
                failed('Module could not be found')
              }

              if (result.error) {
                failed(`${result.error}`)
              }

              return validatePackageJSON(result, {
                appendToOutput,
                failed,
                filePath: path
              })
                .then(() => {
                  return {
                    moduleName,
                    moduleVersion,
                    path,
                    ...other
                  }
                })
            })
        })
    }
  }
}
