export default function finish () {
  return {
    label: 'Finish',
    cb ({ chain, done, appendToOutput }) {
      return chain
        .then(() => {
          appendToOutput('Finished.')
        })
        .then(done)
    }
  }
}
