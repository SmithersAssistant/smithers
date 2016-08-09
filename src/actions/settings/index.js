import {
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SET_VOICE
} from './types'

export const setPrimaryColor = (color) => ({
  type: SET_PRIMARY_COLOR,
  color
})

export const setSecondaryColor = (color) => ({
  type: SET_SECONDARY_COLOR,
  color
})

export const setVoice = (voice) => ({
  type: SET_VOICE,
  voice
})
