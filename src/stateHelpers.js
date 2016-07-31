import {getState} from './store'

export const getNotifications = () => getState().notifications;
export const getActiveTab = () => getState().tabs.active;
export const getTabsList = () => getState().tabs.list;
export const areTabsVisible = () => getState().tabs.visible;
export const getVoice = () => getState().settings.voice;
export const getThemeColor = (defaultTheme = 'indigo') => getState().settings.theme || defaultTheme
