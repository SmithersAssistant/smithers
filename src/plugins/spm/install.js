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

  const timeText = (start, end) => {
    let diff = end - start
    let symbol = 'ms'
    if (diff > 1000) {
      diff = diff / 1000
      symbol = 's'
    }

    return `${diff.toFixed(1)} ${symbol}`
  }

  const Timing = ({className, start, end}) => {
    return (
      <span className={className}>
        {timeText(start, end)}
      </span>
    )
  }

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
        startTime: undefined,
        endTime: undefined,
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
      this.updateStep(id, (step) => ({
        ...step,
        showOutput: true,
        state: STATE_BUSY
      }), (step) => {
        this.updateStep(id, (step) => ({
          ...step,
          startTime: window.performance.now()
        }))

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
          .then((args) => {
            this.updateStep(id, (step) => ({
              ...step,
              endTime: window.performance.now()
            }))

            return args
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
      this.updateStep(id, (step) => ({
        ...step,
        showOutput: true,
        output: step.output + text,
        state: STATE_FAILED
      }))

      const {verboseMode} = this.state

      this.setState({detailView: !verboseMode, failed: true})
    },
    appendToOutput (id, text) {
      let {failed} = this.state

      if (failed) {
        return
      }

      this.updateStep(id, (step) => ({
        ...step,
        output: step.output + text
      }))
    },
    stepDone (id, args) {
      let {failed} = this.state

      if (failed) {
        return
      }

      this.updateStep(id, (step) => ({
        ...step,
        showOutput: false,
        state: STATE_DONE
      }), () => {
        const {steps} = this.state
        const step = steps.find(step => step.state === STATE_PENDING)

        if (step) {
          chain = chain.then(() => args)
          this.startStep(step.id)
        }
      })
    },
    renderVerboseStepTitle (step, index, breathingRoom = 2, borderChar = '-') {
      let time = ''
      if (step.startTime && step.endTime) {
        time = timeText(step.startTime, step.endTime)
      }

      const title = `${' '.repeat(breathingRoom)}${index + 1}. ${step.label} ${time}${' '.repeat(breathingRoom)}`
      return `${borderChar.repeat(title.length)}\n${title}\n${borderChar.repeat(title.length)}\n\n`
    },
    renderVerboseMode () {
      const {steps} = this.state
      let start = 0
      let end = 0

      // Only show items that are done and are busy
      // Pending items are useless at this moment
      const output = steps.filter(step => step.state !== STATE_PENDING).map((step, i) => {
        start += step.startTime
        end += step.endTime

        return `${this.renderVerboseStepTitle(step, i)}${step.output}\n`
      }).join('\n')

      return `${output}\n\nTotal Execution Time: ${timeText(start, end)}`
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
                            this.updateStep(step.id, (step) => ({
                              ...step,
                              showOutput: !step.showOutput
                            }))
                          }}
                          className='right'
                        >
                          {step.showOutput
                            ? 'hide output'
                            : 'show output'}
                        </A>
                      )}
                      {step.endTime && step.startTime && (
                        <Timing
                          className={css(styles.timing, styles.right)}
                          start={step.startTime}
                          end={step.endTime}
                        />
                      )}
                      {step.showOutput && step.output.trim() && (
                        <div>
                          {step.state === STATE_BUSY && (
                            <Icon
                              className={css(styles.busyIcon)}
                              icon='spinner fa-pulse'
                            />
                          )}
                          <PinToBottom>
                            <pre className={css(styles.verboseModeBox, styles.verboseModeAsInfo)}>{step.output}</pre>
                          </PinToBottom>
                        </div>
                      )}
                    </CollectionItem>
                  ))}
                  <CollectionItem className='clearfix'>
                    {'Total Execution Time: '}
                    <Timing
                      start={steps.map(step => step.startTime).reduce((total, curr) => total + curr, 0)}
                      end={steps.map(step => step.endTime).reduce((total, curr) => total + curr, 0)}
                    />
                  </CollectionItem>
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
