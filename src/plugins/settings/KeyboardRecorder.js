import React from 'react'
import { ipcRenderer } from 'electron'
import debounce from 'lodash/debounce'
import { StyleSheet, css } from 'aphrodite'
import { px, color } from 'styles/theme'
import { getSecondaryColor, getPrimaryColor } from 'state'
import uniq from 'lodash/uniq'

const DEFAULT_STATE = 'DEFAULT_STATE'
const ERROR_STATE = 'ERROR_STATE'
const SUCCESS_STATE = 'SUCCESS_STATE'

const modifiers = [
  { keys: [ 17 ], accelerator: 'Control', symbol: '⌃' },
  { keys: [ 18 ], accelerator: 'Alt', symbol: '⌥' },
  { keys: [ 16 ], accelerator: 'Shift', symbol: '⇧' },
  { keys: [ 91, 9 ], accelerator: 'Command', symbol: '⌘' }
]

const keys = [
  { keys: [ 48, 96 ], accelerator: '0' },
  { keys: [ 49, 97 ], accelerator: '1' },
  { keys: [ 50, 98 ], accelerator: '2' },
  { keys: [ 51, 99 ], accelerator: '3' },
  { keys: [ 52, 100 ], accelerator: '4' },
  { keys: [ 53, 101 ], accelerator: '5' },
  { keys: [ 54, 102 ], accelerator: '6' },
  { keys: [ 55, 109 ], accelerator: '7' },
  { keys: [ 56, 104 ], accelerator: '8' },
  { keys: [ 57, 105 ], accelerator: '9' },
  { keys: [ 65 ], accelerator: 'A' },
  { keys: [ 66 ], accelerator: 'B' },
  { keys: [ 67 ], accelerator: 'C' },
  { keys: [ 68 ], accelerator: 'D' },
  { keys: [ 69 ], accelerator: 'E' },
  { keys: [ 70 ], accelerator: 'F' },
  { keys: [ 71 ], accelerator: 'G' },
  { keys: [ 72 ], accelerator: 'H' },
  { keys: [ 73 ], accelerator: 'I' },
  { keys: [ 74 ], accelerator: 'J' },
  { keys: [ 75 ], accelerator: 'K' },
  { keys: [ 76 ], accelerator: 'L' },
  { keys: [ 77 ], accelerator: 'M' },
  { keys: [ 78 ], accelerator: 'N' },
  { keys: [ 79 ], accelerator: 'O' },
  { keys: [ 80 ], accelerator: 'P' },
  { keys: [ 81 ], accelerator: 'Q' },
  { keys: [ 82 ], accelerator: 'R' },
  { keys: [ 83 ], accelerator: 'S' },
  { keys: [ 84 ], accelerator: 'T' },
  { keys: [ 85 ], accelerator: 'U' },
  { keys: [ 86 ], accelerator: 'V' },
  { keys: [ 87 ], accelerator: 'W' },
  { keys: [ 88 ], accelerator: 'X' },
  { keys: [ 89 ], accelerator: 'Y' },
  { keys: [ 90 ], accelerator: 'Z' },
  { keys: [ 112 ], accelerator: 'F1' },
  { keys: [ 113 ], accelerator: 'F2' },
  { keys: [ 114 ], accelerator: 'F3' },
  { keys: [ 115 ], accelerator: 'F4' },
  { keys: [ 116 ], accelerator: 'F5' },
  { keys: [ 117 ], accelerator: 'F6' },
  { keys: [ 118 ], accelerator: 'F7' },
  { keys: [ 119 ], accelerator: 'F8' },
  { keys: [ 120 ], accelerator: 'F9' },
  { keys: [ 121 ], accelerator: 'F10' },
  { keys: [ 122 ], accelerator: 'F11' },
  { keys: [ 123 ], accelerator: 'F12' },
  { keys: [ 124 ], accelerator: 'F13' },
  { keys: [ 125 ], accelerator: 'F14' },
  { keys: [ 126 ], accelerator: 'F15' },
  { keys: [ 127 ], accelerator: 'F16' },
  { keys: [ 128 ], accelerator: 'F17' },
  { keys: [ 129 ], accelerator: 'F18' },
  { keys: [ 130 ], accelerator: 'F19' },
  { keys: [ 131 ], accelerator: 'F20' },
  { keys: [ 132 ], accelerator: 'F21' },
  { keys: [ 133 ], accelerator: 'F22' },
  { keys: [ 134 ], accelerator: 'F23' },
  { keys: [ 135 ], accelerator: 'F24' },
  { keys: [ 32 ], accelerator: 'Space' },
  { keys: [ 8 ], accelerator: 'Backspace' },
  { keys: [ 9 ], accelerator: 'Tab' },
  { keys: [ 13 ], accelerator: 'Enter' },
  { keys: [ 27 ], accelerator: 'Esc' },
  { keys: [ 33 ], accelerator: 'PageUp' },
  { keys: [ 34 ], accelerator: 'PageDown' },
  { keys: [ 35 ], accelerator: 'End' },
  { keys: [ 36 ], accelerator: 'Home' },
  { keys: [ 37 ], accelerator: 'Left' },
  { keys: [ 38 ], accelerator: 'Up' },
  { keys: [ 39 ], accelerator: 'Right' },
  { keys: [ 40 ], accelerator: 'Down' },
  { keys: [ 45 ], accelerator: 'Insert' },
  { keys: [ 46 ], accelerator: 'Delete' }
]

const styles = StyleSheet.create({
  help: {
    float: 'left',
    fontSize: 12,
    color: color('grey', 400),
    marginRight: 4
  },
  [SUCCESS_STATE]: {
    border: `1px solid ${color('green')}`
  },
  [ERROR_STATE]: {
    border: `1px solid ${color('red')}`
  },
  keyboard: {
    position: 'relative',
    display: 'inline-block',
    padding: px(0, 10),
    backgroundColor: color('grey', 50),
    border: `1px solid ${color('grey', 200)}`,
    height: 34,
    lineHeight: px(34),
    verticalAlign: 'middle'
  },
  recorder: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    opacity: 0
  },
  key: {
    color: color('grey', 400),
    fontFamily: 'monospace',
    fontSize: 18,
    margin: px(0, 2)
  },
  keyActive: {
    color: color(getSecondaryColor(), 700)
  },
  keyGeneral: {
    fontFamily: 'Roboto, sans-serif',
    paddingLeft: 15
  },
  recording: {
    border: `1px solid ${color(getPrimaryColor(), 200)}`
  }
})

const KeyboardRecorder = React.createClass({
  getInitialState () {
    return {
      state: DEFAULT_STATE,
      helpText: 'Select this field and type the hotkey you want',
      active: this.props.shortcut,
      recording: false,
      list: []
    }
  },
  getDefaultProps () {
    return {
      showHelp: true,
      onDone: () => {}
    }
  },
  componentWillMount () {
    this.stopRecording = debounce(this.stopRecording, 800)
  },
  setDefaultHelpText () {
    this.setState({ helpText: this.getInitialState().helpText, state: DEFAULT_STATE })
  },
  setErrorHelpText (helpText = 'The shortcut is already taken') {
    this.setState({ helpText, state: ERROR_STATE })

    setTimeout(() => {
      this.setDefaultHelpText()
    }, 1600)
  },
  setSuccessHelpText (helpText = 'The shortcut has been set successfully') {
    this.setState({ helpText, state: SUCCESS_STATE })

    setTimeout(() => {
      this.setDefaultHelpText()
    }, 1600)
  },
  startRecording () {
    this.setState({ recording: true })

    ipcRenderer.sendSync('unregister_all_shortcuts')

    if (this._recorder) {
      this._recorder.focus()
    }
  },
  stopRecording () {
    this.analyze(this.state.list)
    this.setState({ recording: false, list: [] })
    if (this._recorder) {
      this._recorder.blur()
      this._recorder.value = ''
    }
  },
  analyze (keyCodes) {
    const active = uniq(keyCodes.map(keyCode => {
      const modifier = modifiers.find(modifier => (modifier.keys || []).includes(keyCode))
      if (modifier) {
        return modifier.accelerator
      }

      const key = keys.find(key => (key.keys || []).includes(keyCode))
      if (key) {
        return key.accelerator
      }

      return undefined
    }).filter(x => !!x))

    if (!modifiers.map(modifier => modifier.accelerator).some(key => active.includes(key))) {
      this.setErrorHelpText('There should be at least 1 modifier key')
      this.props.onDone(this.state.active)
      return
    }

    if (!keys.map(key => key.accelerator).some(key => active.includes(key))) {
      this.setErrorHelpText('There should be at least 1 non-modifier key')
      this.props.onDone(this.state.active)
      return
    }

    this.setState({ active: active.join('+') }, () => {
      this.setSuccessHelpText()
      this.props.onDone(this.state.active)
    })
  },
  handleKeyDown (event) {
    this.cancelEvent(event)

    this.setState({ list: [ ...this.state.list, event.keyCode ] })
    this.stopRecording()

    return false
  },
  cancelEvent (event) {
    event.preventDefault()
    event.stopPropagation()
  },
  renderKey ({ symbol, accelerator }, active, extraClass) {
    return (
      <span
        key={accelerator}
        className={css(styles.key, active.includes(accelerator) && styles.keyActive, extraClass)}
      >
        {symbol || accelerator}
      </span>
    )
  },
  render () {
    const { active, helpText, recording, state } = this.state
    const {showHelp} = this.props
    const splitted = active.split('+')

    return (
      <div>
        <div
          className={css(styles.keyboard, recording && styles.recording, styles[state])}
          onClick={() => {
            !recording
              ? this.startRecording()
              : this.stopRecording()
          }}
        >
          <input
            className={css(styles.recorder)}
            type='text'
            ref={(input) => { this._recorder = input }}
            onKeyDown={(event) => this.handleKeyDown(event)}
            onKeyUp={(event) => this.cancelEvent(event)}
            onKeyPress={(event) => this.cancelEvent(event)}
          />
          {modifiers.map(modifier => this.renderKey(modifier, splitted))}
          {keys.filter(key => splitted.includes(key.accelerator)).map(key => this.renderKey(key, splitted, styles.keyGeneral))}
        </div>
        {showHelp && (<span className={css(styles.help)}>{helpText}</span>)}
      </div>
    )
  }
})

export default KeyboardRecorder
