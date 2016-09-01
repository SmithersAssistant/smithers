import drivers from '../drivers'

export default function findDriver (input, robot) {
  return {
    label: 'Find driver',
    cb ({ chain, appendToOutput, failed }) {
      return chain
        .then(() => {
          appendToOutput(`Locating correct update driver for '${input}'`)
          const plugin = robot.plugins().find(plugin => plugin.name === input.trim())

          if (!plugin) {
            failed(`\nWe could not find the plugin '${input}'`)
          }

          return drivers.find(driver => {
            const driverInfo = driver(input, robot)
            const handlesPlugin = (driverInfo.handles || []).includes(plugin.source)

            appendToOutput(`\n - [${handlesPlugin ? 'v' : 'x'}] Testing for ${driverInfo.label} driver`)

            return handlesPlugin
          })
        })
    }
  }
}
