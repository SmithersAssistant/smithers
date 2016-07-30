import {
  SET_THEME,
  SET_VOICE
} from './types'

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme
})

export const setVoice = (voice) => ({
  type: SET_VOICE,
  voice
})
