import rimraf from 'rimraf'

export default {
  label: 'Remove folder',
  cb ({ chain, appendToOutput, filePath }) {
    return chain
      .then((plugin) => {
        appendToOutput('Locating file path: ')
        const filePath = plugin.location
        appendToOutput(filePath)

        appendToOutput(`\n - Removing ${filePath}`)
        return new Promise((resolve, reject) => {
          rimraf(filePath, (err) => err
            ? reject(err)
            : resolve(plugin))
        })
      })
  }
}
