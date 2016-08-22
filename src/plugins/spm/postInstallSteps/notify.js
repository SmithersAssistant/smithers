export default function notify (input) {
  return {
    label: 'Notify',
    cb ({ chain, appendToOutput }) {
      return chain
        .then((plugin) => {
          const msg = 'Plugin has been installed'

          appendToOutput(msg)
          window.Robot.notify(msg)

          return plugin
        })
    }
  }
}
