import { getState } from './store'
import { color } from './styles/functions/_color'

export const getNotifications = () => getState().notifications
export const getCardsByIdentifier = (identifier) => getState().cards.cards.filter(card => card.card === identifier)
export const getActiveTab = () => getState().tabs.active
export const getTabsList = () => getState().tabs.list
export const areTabsVisible = () => getState().tabs.visible
export const getVoice = () => getState().settings.voice
export const getPrimaryColor = (defaultTheme = 'indigo') => getState().settings.theme.primaryColor || defaultTheme
export const getSecondaryColor = (defaultTheme = 'pink') => getState().settings.theme.secondaryColor || defaultTheme
export const getThemePalette = () => {
  return {
    primary1Color: color(getPrimaryColor()),
    primary2Color: color(getPrimaryColor(), 700),
    accent1Color: color(getSecondaryColor(), 'A200')
  }
}
export const getStateForCard = (id) => getState().cards.cards.find(card => card.id === id).state || {}
export const getCardById = (id) => getState().cards.cards.find(card => card.id === id)
export const cardExists = (id) => getState().cards.cards.filter(card => card.id === id).length > 0
