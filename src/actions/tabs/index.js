import {v4 as uuid} from 'uuid'
import {dispatch} from 'store'
import {getActiveTab, getTabsList} from 'stateHelpers'

import {
  ADD_TAB,
  EDIT_TAB,
  HIDE_TABS,
  SHOW_TABS,
  REMOVE_TAB,
  MOVE_TAB,
  MOVE_TAB_TO_THE_LEFT,
  MOVE_TAB_TO_THE_RIGHT,
  FOCUS_TAB,
  FOCUS_PREV_TAB,
  FOCUS_NEXT_TAB
} from './types'

const findTabIndex = (list, active) => {
  return list.findIndex(tab => tab.id == active)
}

export const addTab = (title, id = uuid()) => ({
  type: ADD_TAB,
  title,
  id
})

export const editTab = (title, id = getActiveTab()) => ({
  type: EDIT_TAB,
  title,
  id
})

export const focusTab = (id) => ({
  type: FOCUS_TAB,
  id
})

export const hideTabs = () => ({
  type: HIDE_TABS
})

export const showTabs = () => ({
  type: SHOW_TABS
})

export const removeTab = (id = getActiveTab()) => ({
  type: REMOVE_TAB,
  id
})

const removeTabs = (id = getActiveTab(), callback) => {
  const list = getTabsList()
  const activeTab = findTabIndex(list, id)

  list.filter((item, index) => callback(index, activeTab))
  .forEach(tab => dispatch(removeTab(tab.id)))
}

export const removeTabsToTheLeft = (id = getActiveTab()) => {
  removeTabs(id, (index, activeTab) => index < activeTab)
}

export const removeTabsToTheRight = (id = getActiveTab()) => {
  removeTabs(id, (index, activeTab) => index > activeTab)
}

export const removeOtherTabs = (id = getActiveTab()) => {
  removeTabs(id, (index, activeTab) => index !== activeTab)
}

export const moveTab = (oldIndex, newIndex) => ({
  type: MOVE_TAB,
  oldIndex,
  newIndex
})

export const moveTabToTheLeft = (id = getActiveTab()) => ({
  type: MOVE_TAB_TO_THE_LEFT,
  id
})

export const moveTabToTheRight = (id = getActiveTab()) => ({
  type: MOVE_TAB_TO_THE_RIGHT,
  id
})

export const focusPrevTab = (places = 1) => ({
  type: FOCUS_PREV_TAB,
  places: ~~places
})

export const focusNextTab = (places = 1) => ({
  type: FOCUS_NEXT_TAB,
  places: ~~places
})
