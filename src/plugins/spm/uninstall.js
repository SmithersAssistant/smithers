import React from 'react'

import { LOCAL_PLUGIN, EXTERNAL_PLUGIN } from 'pluginSystem/sources'
import preUninstallSteps from './preUninstallSteps'
import postUninstallSteps from './postUninstallSteps'

import stepper from './stepper'

import { enhance, restorableComponent } from 'components/functions'

const UNINSTALL_COMPONENT = 'com.robinmalfait.spm.uninstall'

export default robot => {
  const { Blank } = robot.cards

  const Stepper = stepper(robot, [
    ...preUninstallSteps,
    ...postUninstallSteps
  ])

  class Uninstall extends React.Component {
    state = {
      done: false,
      state: {}
    };

    markAsDone = (state) => {
      this.setState({ done: true, state })
    };

    render () {
      let { silent, plugin, ...other } = this.props

      return (
        <Blank
          {...other}
          title={`Uninstalling ${plugin}`}
        >
          <Stepper
            done={this.state.done}
            state={this.state.state}
            title={<span>Uninstalling <em>{plugin.split(/[ /]/g).filter(x => !!x).pop()}</em></span>}
            plugin={plugin}
            onFinished={(state) => {
              this.markAsDone(state)

              if (silent) {
                this.props.removeCard()
              }
            }}
            onFailed={(state) => this.markAsDone(state)}
          />
        </Blank>
      )
    }
  }

  robot.registerComponent(enhance(Uninstall, [
    restorableComponent
  ]), UNINSTALL_COMPONENT)

  robot.listen(/^uninstall (.*)$/, {
    description: 'uninstall a plugin',
    usage: 'uninstall <plugin>',
    args: {
      plugin: () => {
        return robot.plugins().filter(plugin => [ LOCAL_PLUGIN, EXTERNAL_PLUGIN ].includes(plugin.source)).map(plugin => plugin.name)
      }
    }
  }, (res) => {
    let { plugin } = res.matches
    let silent = false

    if (plugin.includes('--silent')) {
      silent = true
      plugin = plugin.replace('--silent', '')
    }

    const multiplePlugins = plugin.trim().split(' ')
    multiplePlugins.forEach((singlePlugin) => {
      robot.addCard(UNINSTALL_COMPONENT, {
        plugin: singlePlugin,
        silent
      })
    })
  })
}
