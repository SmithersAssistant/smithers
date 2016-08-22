import React from 'react'
import {clipboard} from 'electron'

import preInstallSteps from './preInstallSteps'
import postInstallSteps from './postInstallSteps'

import installStyles from './InstallStyles'
import stateViewer from './StateViewer'

const INSTALL_COMPONENT = 'com.robinmalfait.spm.install'

export default robot => {
  const {Blank} = robot.cards
  const {css, color, A, Icon, Collection, CollectionItem, PinToBottom, material} = robot.UI
  const {LinearProgress} = material

  const styles = installStyles(robot.UI)

  const STATE_PENDING = 'STATE_PENDING'
  const STATE_BUSY = 'STATE_BUSY'
  const STATE_DONE = 'STATE_DONE'
  const STATE_FAILED = 'STATE_FAILED'

  const StateViewer = stateViewer(robot.UI, {
    STATE_PENDING, STATE_BUSY, STATE_DONE, STATE_FAILED
  })

  let chain = Promise.resolve(undefined)

  const Install = React.createClass({
    getInitialState () {
      const steps = []

      return {
        detailView: false,
        verboseMode: false,
        failed: false,
        steps
      }
    },
    componentDidMount () {
      const {steps} = this.state

      ;[
        ...preInstallSteps,
        ...postInstallSteps
      ].map(step => {
        steps.push(this.registerStep(step))
      })

      this.setState({steps}, () => {
        const step = steps.find(step => step.state === STATE_PENDING)

        this.startStep(step.id)
      })
    },
    registerStep (step) {
      const id = robot.uuid()
      const {label, output = '', cb = robot.noop} = typeof step === 'function'
        ? step(
        this.props.plugin,
        robot
      )
        : step

      return {
        id,
        label,
        output,
        cb,
        showOutput: false,
        state: STATE_PENDING
      }
    },
    updateStep (id, handler = robot.noop, done = robot.noop) {
      let {steps} = this.state

      steps = steps.map((step) => {
        if (step.id === id) {
          step = handler(step)
        }

        return step
      })

      this.setState({steps}, () => done(steps.find(step => step.id === id)))
    },
    startStep (id) {
      this.updateStep(id, (step) => {
        return {
          ...step,
          state: STATE_BUSY
        }
      }, (step) => {
        chain = (step.cb || robot.noop)({
          chain,
          registerStep: (step) => {
            const {steps} = this.state
            const index = steps.findIndex(step => step.id === id) + 1

            this.setState({
              steps: [
                ...steps.slice(0, index),
                this.registerStep(step),
                ...steps.slice(index, steps.length)
              ]
            })
          },
          failed: (text = 'Something went wrong') => {
            throw new Error(text)
          },
          appendToOutput: (text) => {
            this.appendToOutput(id, text)
          }
        })
          .then((args) => this.stepDone(id, args))
          .catch((err) => {
            robot.notify('Installation failed')
            this.failed(id, err instanceof Error
              ? err.message
              : err
            )
          })
      })
    },
    failed (id, text) {
      this.updateStep(id, (step) => {
        return {
          ...step,
          showOutput: true,
          output: step.output + text,
          state: STATE_FAILED
        }
      })

      const {verboseMode} = this.state

      this.setState({detailView: !verboseMode, failed: true})
    },
    appendToOutput (id, text) {
      let {failed} = this.state

      if (failed) {
        return
      }

      this.updateStep(id, (step) => {
        const x = {
          ...step,
          output: step.output + text
        }

        return x
      })
    },
    stepDone (id, args) {
      let {failed} = this.state

      if (failed) {
        return
      }

      this.updateStep(id, (step) => {
        return {
          ...step,
          state: STATE_DONE
        }
      }, () => {
        const {steps} = this.state
        const step = steps.find(step => step.state === STATE_PENDING)

        if (step) {
          chain = chain.then(() => args)
          this.startStep(step.id)
        }
      })
    },
    renderVerboseStepTitle (step, index, breathingRoom = 2, borderChar = '-') {
      const title = `${' '.repeat(breathingRoom)}${index + 1}. ${step.label}${' '.repeat(breathingRoom)}`
      return `${borderChar.repeat(title.length)}\n${title}\n${borderChar.repeat(title.length)}\n\n`
    },
    renderVerboseMode () {
      const {steps} = this.state

      // Only show items that are done and are busy
      // Pending items are useless at this moment
      return steps.filter(step => step.state !== STATE_PENDING).map((step, i) => {
        return `${this.renderVerboseStepTitle(step, i)}${step.output}\n`
      }).join('\n')
    },
    render () {
      let {plugin, ...other} = this.props
      let {detailView, verboseMode, steps} = this.state

      const stepsDone = steps.filter(step => step.state === STATE_DONE).length
      const stepsBusy = steps.filter(step => step.state === STATE_BUSY)
      const stepsFailed = steps.filter(step => step.state === STATE_FAILED)
      const stepsPending = steps.filter(step => step.state === STATE_PENDING).length

      let statusStyles = {
        color: color('orange', 700)
      }
      let statusIcon = 'clock-o'

      if (stepsDone === steps.length) {
        statusStyles = {
          color: color('green', 700)
        }
        statusIcon = 'check'
      }

      if (stepsFailed.length > 0) {
        statusStyles = {
          color: color('red', 700)
        }
        statusIcon = 'times'
      }

      const titleParts = [
        <span>Installing <em>{plugin.split(/[ /]/g).filter(x => !!x).pop()}</em></span>,
        <span>{steps.length} steps</span>,
        <A onClick={() => {
          this.setState({verboseMode: !verboseMode})
        }}>Turn verbose mode {verboseMode ? 'off' : 'on'}</A>
      ]

      if (!verboseMode) {
        titleParts.push(<A onClick={() => {
          this.setState({detailView: !detailView})
        }}>{detailView ? 'less' : 'more'} details</A>)
      }

      return (
        <Blank
          {...other}
          title={`Installing ${plugin}`}
        >
          <ul className={css(styles.title)}>
            {titleParts.map((part, i) => (
              <li className={css(
                styles.titlePart,
                i === 0 && styles.firstTitlePart,
                i === titleParts.length - 1 && styles.lastTitlePart
              )} key={i}>{part}</li>
            ))}
          </ul>

          {verboseMode ? (
            <PinToBottom>
              <pre className={css(styles.verboseModeBox, styles.boxHeight)}>{this.renderVerboseMode()}</pre>
            </PinToBottom>
          ) : (
            detailView ? (
              <PinToBottom>
                <Collection className={css(styles.boxHeight)}>
                  {steps.map((step, i) => (
                    <CollectionItem key={i} className='clearfix'>
                      <StateViewer state={step.state}>
                        {step.label}
                      </StateViewer>
                      {![STATE_PENDING].includes(step.state) && step.output.trim() && (
                        <A
                          onClick={() => {
                            this.updateStep(step.id, (step) => {
                              return {
                                ...step,
                                showOutput: !step.showOutput
                              }
                            })
                          }}
                          className='right'
                        >
                          {step.showOutput
                            ? 'hide output'
                            : 'show output'}
                        </A>
                      )}
                      {step.showOutput && (
                        <PinToBottom>
                          <pre className={css(styles.verboseModeBox, styles.verboseModeAsInfo)}>{step.output}</pre>
                        </PinToBottom>
                      )}
                    </CollectionItem>
                  ))}
                </Collection>
              </PinToBottom>
            ) : (
              <Collection>
                {stepsDone > 0 && (
                  <CollectionItem>
                    <StateViewer state={STATE_DONE}>
                      {stepsDone} step{stepsDone === 1 ? '' : 's'} done
                    </StateViewer>
                  </CollectionItem>
                )}
                {[...stepsBusy, ...stepsFailed].map((step, i) => (
                  <CollectionItem key={i}>
                    <StateViewer state={step.state}>
                      {step.label}
                    </StateViewer>
                  </CollectionItem>
                ))}
                {stepsPending > 0 && (
                  <CollectionItem>
                    <StateViewer state={STATE_PENDING}>
                      {stepsPending} step{stepsPending === 1 ? '' : 's'} pending
                    </StateViewer>
                  </CollectionItem>
                )}
              </Collection>
            )
          )}
          <span>
            {stepsDone} / {steps.length}
          </span>
          <span className='right'>
            <Icon
              style={statusStyles}
              icon={statusIcon}
            />
          </span>
          <LinearProgress
            mode='determinate'
            max={steps.length}
            value={stepsDone}
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

    robot.addCard(INSTALL_COMPONENT, {plugin: plugin.trim()})
  })
}
