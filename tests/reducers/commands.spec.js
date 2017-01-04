import {expect} from 'chai'

import commands, {defaultState} from '../../src/reducers/commands'
import {HANDLE_INPUT, PREVIOUS_COMMAND, NEXT_COMMAND, CLEAR_COMMAND_HISTORY} from '../../src/actions/types'

export default () => {
  describe('commands', () => {
    it('should have a default state', () => {
      const state = {
        past: [],
        command: '',
        currentCommand: 0
      }

      expect(defaultState).to.deep.equal(state)
    })

    it('should handle the input', () => {
      let state = {
        past: [],
        command: '',
        currentCommand: 0
      }

      const action = {
        type: HANDLE_INPUT,
        input: 'something'
      }

      let newState = commands(state, action)
      expect(newState).to.deep.equal({
        past: [
          'something'
        ],
        command: '',
        currentCommand: 1
      })

      newState = commands(newState, action)
      expect(newState).to.deep.equal({
        past: [
          'something',
          'something'
        ],
        command: '',
        currentCommand: 2
      })
    })

    it('should go to the previous command', () => {
      const state = {
        past: [
          'some',
          'earlier',
          'commands'
        ],
        command: '',
        currentCommand: 3
      }

      const action = {
        type: PREVIOUS_COMMAND
      }

      let newState = commands(state, action)
      expect(newState).to.deep.equal({
        past: [
          'some',
          'earlier',
          'commands'
        ],
        command: 'commands',
        currentCommand: 2
      })
    })

    it('should go to the previous command and stop at the first one', () => {
      const state = {
        past: [
          'some',
          'earlier',
          'commands'
        ],
        command: '',
        currentCommand: 3
      }

      const action = {
        type: PREVIOUS_COMMAND
      }

      // Going to commands
      let newState = commands(state, action)

      // Going to earlier
      newState = commands(newState, action)

      // Going to some
      newState = commands(newState, action)

      // Going "past" some, but should stay at some
      newState = commands(newState, action)

      expect(newState).to.deep.equal({
        past: [
          'some',
          'earlier',
          'commands'
        ],
        command: 'some',
        currentCommand: 0
      })
    })

    it('should go to the next command', () => {
      const state = {
        past: [
          'some',
          'earlier',
          'commands'
        ],
        command: '',
        currentCommand: 0
      }

      const action = {
        type: NEXT_COMMAND
      }

      let newState = commands(state, action)
      expect(newState).to.deep.equal({
        past: [
          'some',
          'earlier',
          'commands'
        ],
        command: 'earlier',
        currentCommand: 1
      })
    })

    it('should go to the last command and stop at the last one + 1; command must be empty', () => {
      const state = {
        past: [
          'some',
          'earlier',
          'commands'
        ],
        command: 'some',
        currentCommand: 0
      }

      const action = {
        type: NEXT_COMMAND
      }

      // Going to earlier
      let newState = commands(state, action)

      // Going to commands
      newState = commands(newState, action)

      // Going "further" than commands
      newState = commands(newState, action)

      expect(newState).to.deep.equal({
        past: [
          'some',
          'earlier',
          'commands'
        ],
        command: '',
        currentCommand: 3
      })
    })

    it('should clear the command history', () => {
      const state = {
        past: [
          'some',
          'earlier',
          'commands'
        ],
        command: 'earlier',
        currentCommand: 1
      }

      const action = {
        type: CLEAR_COMMAND_HISTORY
      }

      let newState = commands(state, action)

      expect(newState).to.deep.equal({
        past: [],
        command: '',
        currentCommand: 0
      })
    })
  })
}
