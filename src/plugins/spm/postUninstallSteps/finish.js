export default function finish () {
  return {
    label: 'Finish',
    cb ({ chain, appendToOutput }) {
      return chain
        .then(() => {
          appendToOutput('Finished.')
        })
    }
  }
}
