import {
  HANDLE_INPUT,
  PREVIOUS_COMMAND,
  NEXT_COMMAND,
} from './types'

export const handleInput = (input) => ({
  type: HANDLE_INPUT,
  input
})

export const previousCommand = () => ({
  type: PREVIOUS_COMMAND
})

export const nextCommand = () => ({
  type: NEXT_COMMAND
})
