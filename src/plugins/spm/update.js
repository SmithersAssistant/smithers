import React from 'react'

import {EXTERNAL_PLUGIN} from 'pluginSystem/sources'
import preUpdateSteps from './preUpdateSteps'
import postUpdateSteps from './postUpdateSteps'

import stepper from './stepper'

const UPDATE_COMPONENT = 'com.robinmalfait.spm.update'

export default robot => {
  const {Blank} = robot.cards

  const Stepper = stepper(robot, [
    ...preUpdateSteps,
    ...postUpdateSteps
  ])

  const Update = React.createClass({
    render () {
      let {plugin, ...other} = this.props

      return (
        <Blank
          {...other}
          title={`Updating ${plugin}`}
        >
          <Stepper
            title={<span>Updating <em>{plugin.split(/[ /]/g).filter(x => !!x).pop()}</em></span>}
            plugin={plugin}
          />
        </Blank>
      )
    }
  })

  robot.registerComponent(Update, UPDATE_COMPONENT)

  robot.listen(/^update (.*)$/, {
    description: 'update a plugin. these plugins will only be npm remote plugins.',
    usage: 'update <plugin>',
    args: {
      plugin: () => {
        return robot.plugins().filter(plugin => [EXTERNAL_PLUGIN].includes(plugin.source)).map(plugin => plugin.name)
      }
    }
  }, (res) => {
    const {plugin} = res.matches

    robot.addCard(UPDATE_COMPONENT, {plugin})
  })
}
