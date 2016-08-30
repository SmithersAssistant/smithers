import React from 'react'

import {LOCAL_PLUGIN, EXTERNAL_PLUGIN} from 'pluginSystem/sources'
import preUninstallSteps from './preUninstallSteps'

import stepper from './stepper'

const UNINSTALL_COMPONENT = 'com.robinmalfait.spm.uninstall'

export default robot => {
  const {Blank} = robot.cards

  const Stepper = stepper(robot, [
    ...preUninstallSteps
  ])

  const Uninstall = React.createClass({
    render () {
      let {plugin, ...other} = this.props

      return (
        <Blank
          {...other}
          title={`Uninstalling ${plugin}`}
        >
          <Stepper
            title={<span>Uninstalling <em>{plugin.split(/[ /]/g).filter(x => !!x).pop()}</em></span>}
            plugin={plugin}
          />
        </Blank>
      )
    }
  })

  robot.registerComponent(Uninstall, UNINSTALL_COMPONENT)

  robot.listen(/^uninstall (.*)$/, {
    description: 'uninstall a plugin',
    usage: 'uninstall <plugin>',
    args: {
      plugin: () => {
        return robot.plugins().filter(plugin => [LOCAL_PLUGIN, EXTERNAL_PLUGIN].includes(plugin.source)).map(plugin => plugin.name)
      }
    }
  }, (res) => {
    const {plugin} = res.matches

    robot.addCard(UNINSTALL_COMPONENT, {plugin})
  })
}
