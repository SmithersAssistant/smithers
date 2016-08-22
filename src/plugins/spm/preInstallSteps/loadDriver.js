export default function loadDriver (input, robot) {
  return {
    label: 'Load driver',
    cb ({ chain, appendToOutput, failed, registerStep }) {
      return chain
        .then((driver) => {
          if (driver === undefined) {
            failed(`No installation driver found for '${input}', how do we need to install this? :(`)
          }

          const driverInfo = driver(input, robot)
          appendToOutput(`Loading driver '${driverInfo.label}'`)
          driverInfo.installSteps.reverse().map(step => registerStep(step))

          return input
        })
    }
  }
}
