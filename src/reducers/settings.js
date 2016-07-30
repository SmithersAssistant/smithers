import {
  SET_THEME,
  SET_VOICE
} from '../actions/types'

const settings = (state = {}, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.theme
      }
    case SET_VOICE:
      return {
        ...state,
        voice: action.voice
      }
    default:
      return state
  }
}

export const defaultState = {
  theme: 'indigo',
  voice: undefined
}

export default settings
