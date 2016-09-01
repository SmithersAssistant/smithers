export default function notify () {
  return {
    label: 'Notify',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((plugin) => {
          const msg = 'Plugin has been updated'

          appendToOutput(msg)
          window.Robot.notify(msg)

          return plugin
        })
    }
  }
}
