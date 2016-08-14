import {
  HANDLE_INPUT,
  PREVIOUS_COMMAND,
  NEXT_COMMAND,
  CLEAR_COMMAND_HISTORY
} from '../actions/types'

const commands = (state = {}, action) => {
  let currentCommand

  switch (action.type) {
    case HANDLE_INPUT:
      return {
        ...state,
        currentCommand: state.past.length + 1,
        past: [
          ...state.past,
          action.input
        ]
      }
    case PREVIOUS_COMMAND:
      currentCommand = Math.max(0, state.currentCommand - 1)

      return {
        ...state,
        command: state.past[currentCommand] || '',
        currentCommand
      }
    case NEXT_COMMAND:
      currentCommand = Math.min(state.past.length, state.currentCommand + 1)

      return {
        ...state,
        command: state.past[currentCommand] || '',
        currentCommand
      }
    case CLEAR_COMMAND_HISTORY:
      return {
        ...state,
        currentCommand: 0,
        command: '',
        past: []
      }
    default:
      return state
  }
}

export const defaultState = {
  past: [],
  command: '',
  currentCommand: 0
}

export default commands
