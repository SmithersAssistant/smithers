export default function loadDriver (input, robot) {
  return {
    label: 'Load driver',
    cb ({ chain, appendToOutput, failed, registerStep }) {
      return chain
        .then((driver) => {
          if (driver === undefined) {
            failed(`No update driver found for '${input}', how do we need to update this? :(`)
          }

          const driverInfo = driver(input, robot)
          appendToOutput(`Loading driver '${driverInfo.label}'`)

          const {updateSteps = []} = driverInfo
          updateSteps.length > 0
            ? updateSteps.map(step => registerStep(step))
            : failed('\n\nIt looks like there are no update steps for this driver\n')

          return robot.plugins().find(plugin => plugin.name === input.trim())
        })
    }
  }
}
