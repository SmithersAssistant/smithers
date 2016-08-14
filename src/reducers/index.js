import {combineReducers} from 'redux'

import commands, {defaultState as commandsDefaultState} from './commands'
import cards, {defaultState as cardsDefaultState} from './cards'
import notifications, {defaultState as notificationsDefaultState} from './notifications'
import tabs, {defaultState as tabsDefaultState} from './tabs'
import settings, {defaultState as settingsDefaultState} from './settings'

// import throttle from 'lodash/throttle'
// import { loadState, saveState } from '../storage'

// const STORAGE_ACTIONS_KEY = '@@actions'
//
// const saveFilteredState = throttle((action) => {
//     saveState([
//         ...loadState([], STORAGE_ACTIONS_KEY),
//         action
//     ], STORAGE_ACTIONS_KEY)
// }, 1000)

const rootReducer = combineReducers({
  commands,
  cards,
  notifications,
  tabs,
  settings
})

const log = reducer => (state, action) => {
  if (process.env.NODE_ENV == 'development') {
    console.log(action)
  }
  return reducer(state, action)
}

export const defaultState = {
  commands: commandsDefaultState,
  cards: cardsDefaultState,
  notifications: notificationsDefaultState,
  tabs: tabsDefaultState,
  settings: settingsDefaultState
}

export default log(rootReducer)
