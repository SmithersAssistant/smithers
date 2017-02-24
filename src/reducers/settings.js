import reducer from './reducer'

import {
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SET_VOICE
} from '../actions/types'

const settings = reducer({
  [SET_PRIMARY_COLOR]: (state, action) => ({
    ...state,
    theme: {
      ...state.theme,
      primaryColor: action.color
    }
  }),
  [SET_SECONDARY_COLOR]: (state, action) => ({
    ...state,
    theme: {
      ...state.theme,
      secondaryColor: action.color
    }
  }),
  [SET_VOICE]: (state, action) => ({
    ...state,
    voice: action.voice
  })
}, {})

export const defaultState = {
  theme: {
    primaryColor: 'indigo',
    secondaryColor: 'pink'
  },
  voice: undefined
}

export default settings
