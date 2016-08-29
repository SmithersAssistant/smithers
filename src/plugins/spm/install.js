import React from 'react'
import {clipboard} from 'electron'

import stepper from './stepper'
import preInstallSteps from './preInstallSteps'
import postInstallSteps from './postInstallSteps'

const INSTALL_COMPONENT = 'com.robinmalfait.spm.install'

export default robot => {
  const {Blank} = robot.cards

  const Stepper = stepper(robot, [
    ...preInstallSteps,
    ...postInstallSteps
  ])

  const Install = React.createClass({
    render () {
      let {plugin, ...other} = this.props

      return (
        <Blank
          {...other}
          title={`Installing ${plugin}`}
        >
          <Stepper
            title={<span>Installing <em>{plugin.split(/[ /]/g).filter(x => !!x).pop()}</em></span>}
            plugin={plugin}
          />
        </Blank>
      )
    }
  })

  robot.registerComponent(Install, INSTALL_COMPONENT)

  robot.listen(/^install (.*)$/, {
    description: 'install a plugin. this can be a package from npm, or a local path, we\'ll figure it out for you!',
    usage: 'install <plugin>',
    args: {
      plugin: () => {
        return [clipboard.readText().trim()]
      }
    }
  }, (res) => {
    const {plugin} = res.matches

    const multiplePlugins = plugin.trim().split(' ')
    multiplePlugins.forEach((singlePlugin) => {
      robot.addCard(INSTALL_COMPONENT, {plugin: singlePlugin})
    })
  })
}
