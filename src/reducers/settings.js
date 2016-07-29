import {
  SET_THEME,
  SET_VOICE,
  SET_LANGUAGE
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

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language
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
