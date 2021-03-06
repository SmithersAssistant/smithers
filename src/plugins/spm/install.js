import React from 'react'

import stepper from './stepper'
import preInstallSteps from './preInstallSteps'
import postInstallSteps from './postInstallSteps'

import { enhance, restorableComponent } from 'components/functions'

const INSTALL_COMPONENT = 'com.robinmalfait.spm.install'

export default robot => {
  const { Blank } = robot.cards

  const Stepper = stepper(robot, [
    ...preInstallSteps,
    ...postInstallSteps
  ])

  class Install extends React.Component {
    state = {
      done: false,
      state: {}
    }

    markAsDone = (state) => {
      this.setState({ done: true, state })
    }

    render () {
      let { silent, plugin, ...other } = this.props

      return (
        <Blank
          {...other}
          title={`Installing ${plugin}`}
        >
          <Stepper
            done={this.state.done}
            state={this.state.state}
            title={<span>Installing <em>{plugin.split(/[ /]/g).filter(x => !!x).pop()}</em></span>}
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

  robot.registerComponent(enhance(Install, [
    restorableComponent
  ]), INSTALL_COMPONENT)

  robot.listen(/^install (.*)$/, {
    description: 'install a plugin. this can be a package from npm, or a local path, we\'ll figure it out for you!',
    usage: 'install <plugin>'
  }, (res) => {
    let { plugin } = res.matches
    let silent = false

    if (plugin.includes('--silent')) {
      silent = true
      plugin = plugin.replace('--silent', '')
    }

    const multiplePlugins = plugin.trim().split(' ')
    multiplePlugins.forEach((singlePlugin) => {
      robot.addCard(INSTALL_COMPONENT, {
        plugin: singlePlugin,
        silent
      })
    })
  })
}
