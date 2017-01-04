import {expect} from 'chai'

import settings, {defaultState} from '../../src/reducers/settings'
import {SET_PRIMARY_COLOR, SET_SECONDARY_COLOR, SET_VOICE} from '../../src/actions/types'

export default () => {
  describe('settings', () => {
    it('should have a default state', () => {
      const state = {
        theme: {
          primaryColor: 'indigo',
          secondaryColor: 'pink'
        },
        voice: undefined
      }

      expect(defaultState).to.deep.equal(state)
    })

    it('should be able to set the primary color', () => {
      const state = defaultState

      const action = {
        type: SET_PRIMARY_COLOR,
        color: 'purple'
      }

      let newState = settings(state, action)
      expect(newState).to.deep.equal({
        theme: {
          primaryColor: 'purple',
          secondaryColor: 'pink'
        },
        voice: undefined
      })
    })

    it('should be able to set the secondary color', () => {
      const state = defaultState

      const action = {
        type: SET_SECONDARY_COLOR,
        color: 'purple'
      }

      let newState = settings(state, action)
      expect(newState).to.deep.equal({
        theme: {
          primaryColor: 'indigo',
          secondaryColor: 'purple'
        },
        voice: undefined
      })
    })

    it('should be able to set the voice', () => {
      const state = defaultState

      const action = {
        type: SET_VOICE,
        voice: 'agnes'
      }

      let newState = settings(state, action)
      expect(newState).to.deep.equal({
        theme: {
          ...defaultState.theme
        },
        voice: 'agnes'
      })
    })
  })
}
