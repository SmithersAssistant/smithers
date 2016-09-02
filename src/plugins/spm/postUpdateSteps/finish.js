export default function finish (input, robot) {
  return {
    label: 'Finish',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((plugin) => {
          appendToOutput('Opening help card for the updated plugin')
          robot.execute(`help ${plugin.name}`)
          appendToOutput('\n\nFinished.')
        })
    }
  }
}
