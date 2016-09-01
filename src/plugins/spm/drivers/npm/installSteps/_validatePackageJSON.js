import rimraf from 'rimraf'

export default (pckg, {filePath, appendToOutput, failed}) => {
  const mandatoryKeywords = ['smithers', 'plugin']

  appendToOutput(`- checking if package.json file has [${mandatoryKeywords.join(', ')}] as one of the keywords`)

  if (!mandatoryKeywords.every(keyword => (pckg.keywords || []).includes(keyword))) {
    appendToOutput(`\n - Removing ${filePath}`)
    return new Promise((resolve, reject) => {
      rimraf(filePath, (err) => err ? reject(err) : resolve())
    })
      .then(() => {
        failed(`\n - it does not contain one of the mandatory keywords: [${mandatoryKeywords.join(', ')}]`)
      })
  }

  return Promise.resolve()
}
