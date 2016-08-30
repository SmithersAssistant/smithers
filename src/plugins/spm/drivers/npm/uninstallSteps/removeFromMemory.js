export default function removeFromMemory (input, robot) {
  return {
    label: 'Remove from loaded memory',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((plugin) => {
          appendToOutput('Removing from memory...')
          robot.removePlugin(plugin)

          return plugin
        })
    }
  }
}
