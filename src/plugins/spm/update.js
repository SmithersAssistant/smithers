import React from 'react'

import stepper from './stepper'

const UPDATE_COMPONENT = 'com.robinmalfait.spm.update'

export default robot => {
  const {Blank} = robot.cards

  const Stepper = stepper(robot, [])

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
    usage: 'update <plugin>'
  }, (res) => {
    const {plugin} = res.matches

    robot.addCard(UPDATE_COMPONENT, {plugin})
  })
}
