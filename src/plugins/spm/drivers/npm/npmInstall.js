import npmi from 'npmi'

export default function npmInstall (input, robot) {
  return {
    label: 'NPM Install',
    cb ({ chain, appendToOutput }) {
      return chain
        .then(({ moduleName, moduleVersion, path }) => {
          appendToOutput('Building options config')
          const options = {
            name: moduleName,
            version: moduleVersion,
            path,
            forceInstall: true,
            npmLoad: {
              loglevel: 'warn',
              progress: false
            }
          }

          appendToOutput(`\n\n${JSON.stringify(options, null, '  ')}\n\n`)

          appendToOutput('Actually installing plugin')
          return new Promise((resolve, reject) => {
            npmi(options, (err, result) => {
              err
                ? reject(err)
                : resolve({ result, path })
            })
          })
        })
        .then(({ result = [], path }) => {
          result.map(dependency => appendToOutput(`\n - ${dependency[0]}`))
          return {
            path,
            module: result[result.length - 1][0]
          }
        })
    }
  }
}
