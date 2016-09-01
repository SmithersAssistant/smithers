import semver from 'semver'

export default function checkUpdateExists (input, robot) {
  return {
    label: 'Check update exists',
    cb ({ chain, failed, appendToOutput }) {
      return chain
        .then((plugin) => {
          appendToOutput(`Current version: ${plugin.version}`)
          appendToOutput('\n Latest version: ')

          return robot.fetchJson(`http://registry.npmjs.org/${plugin.name}/latest`)
            .then((result) => {
              appendToOutput(result.version)

              if (!semver.gt(result.version, plugin.version)) {
                failed(`\n\n - No update available`)
              }

              return plugin
            })
        })
    }
  }
}
