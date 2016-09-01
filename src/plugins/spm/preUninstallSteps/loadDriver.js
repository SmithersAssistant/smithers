export default function loadDriver (input, robot) {
  return {
    label: 'Load driver',
    cb ({ chain, appendToOutput, failed, registerStep }) {
      return chain
        .then((driver) => {
          if (driver === undefined) {
            failed(`No installation driver found for '${input}', how do we need to uninstall this? :(`)
          }

          const driverInfo = driver(input, robot)
          appendToOutput(`Loading driver '${driverInfo.label}'`)

          const {uninstallSteps = []} = driverInfo
          uninstallSteps.length > 0
            ? uninstallSteps.map(step => registerStep(step))
            : failed('\n\nIt looks like there are no uninstall steps for this driver\n')

          return robot.plugins().find(plugin => plugin.name === input.trim())
        })
    }
  }
}
