export default function notify (input) {
  return {
    label: 'Notify',
    cb ({ chain, done, appendToOutput }) {
      return chain
        .then(() => {
          const msg = 'Plugin has been installed'

          appendToOutput(msg)
          window.Robot.notify(msg)
        })
        .then(done)
    }
  }
}
