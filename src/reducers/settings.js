import {
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SET_VOICE
} from '../actions/types'

const settings = (state = {}, action) => {
  switch (action.type) {
    case SET_PRIMARY_COLOR:
      return {
        ...state,
        theme: {
          ...state.theme,
          primaryColor: action.color
        }
      }
    case SET_SECONDARY_COLOR:
      return {
        ...state,
        theme: {
          ...state.theme,
          secondaryColor: action.color
        }
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
  theme: {
    primaryColor: 'indigo',
    secondaryColor: 'pink'
  },
  voice: undefined
}

export default settings
