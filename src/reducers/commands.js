import reducer from './reducer'

import {
  HANDLE_INPUT,
  PREVIOUS_COMMAND,
  NEXT_COMMAND,
  CLEAR_COMMAND_HISTORY
} from '../actions/types'

const commands = reducer({
  [HANDLE_INPUT]: (state, action) => ({
    ...state,
    currentCommand: state.past.length + 1,
    past: [
      ...state.past,
      action.input
    ]
  }),
  [PREVIOUS_COMMAND]: (state, action) => {
    const currentCommand = Math.max(0, state.currentCommand - 1)

    return {
      ...state,
      command: state.past[currentCommand] || '',
      currentCommand
    }
  },
  [NEXT_COMMAND]: (state, action) => {
    const currentCommand = Math.min(state.past.length, state.currentCommand + 1)

    return {
      ...state,
      command: state.past[currentCommand] || '',
      currentCommand
    }
  },
  [CLEAR_COMMAND_HISTORY]: (state, action) => ({
    ...state,
    currentCommand: 0,
    command: '',
    past: []
  })
}, {})

export const defaultState = {
  past: [],
  command: '',
  currentCommand: 0
}

export default commands
