import {
  SET_THEME,
  SET_VOICE,
  SET_LANGUAGE
} from './types'

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme
})

export const setVoice = (voice) => ({
  type: SET_VOICE,
  voice
})

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  language
})
