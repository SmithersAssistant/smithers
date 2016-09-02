import co from 'co'
import npminstall from 'npminstall'

export default function npmInstall (input, robot) {
  return {
    label: 'NPM Install',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((plugin) => {
          appendToOutput('Installing the newer version')

          return co(function* () {
            yield npminstall({
              root: plugin.location,
              production: true
            })
          })
            .then(() => {
              return plugin
            })
        })
    }
  }
}
