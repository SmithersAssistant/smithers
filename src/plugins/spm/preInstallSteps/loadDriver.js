export default function loadDriver (input, robot) {
  return {
    label: 'Load driver',
    cb ({ chain, appendToOutput, failed, registerStep }) {
      return chain
        .then((driver) => {
          if (driver === undefined) {
            failed(`No installation driver found for '${input}', how do we need to install this? :(`)
          }

          appendToOutput(`Loading driver '${driver.name}'`)

          const driverInfo = driver(input, robot)
          driverInfo.steps.reverse().map(step => registerStep(step))

          return driverInfo
        })
    }
  }
}
