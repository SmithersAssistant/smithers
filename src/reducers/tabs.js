import {v4 as uuid} from 'uuid'
import {userInfo} from 'os'

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
} from '../actions/types'

const normalize = (title = "", otherwise) => {
  const normalized = title.trim();

  return normalized.length > 0 ? normalized : otherwise
}

const findTabIndex = (list, active) => {
  return list.findIndex(tab => tab.id == active)
}

const moveItemInArray = (list, fromIndex, toIndex) => {
  let copy = list.slice()

  toIndex = Math.max(0, Math.min(toIndex, list.length - 1))
  copy.splice(toIndex, 0, copy.splice(fromIndex, 1)[0])

  return copy
}

const findNextActiveTab = ({active, list}, places = 1) => {
  const activeIndex = findTabIndex(list, active)
  let newActiveIndex = activeIndex + places

  if (newActiveIndex < 0) {
    newActiveIndex = list.length - 1
  }

  const boundActiveIndex = newActiveIndex % list.length

  return list[boundActiveIndex].id
}

const findTabBeforeActiveTab = (state, places = 1) => {
  return findNextActiveTab(state, places * -1) // Just to make it negative
}

const findTabAfterActiveTab = (state, places = 1) => {
  return findNextActiveTab(state, places)
}

const tab = (state, action) => {
  switch (action.type) {
    case ADD_TAB:
      return {
        title: normalize(action.title, "untitled"),
        id: action.id
      }
    case EDIT_TAB:
      return {
        ...state,
        title: normalize(action.title, "untitled")
      }
    default:
      return state
  }
}

const tabs = (state = [], action) => {
  let activeIndex

  switch (action.type) {
    case ADD_TAB:
      return {
        ...state,
        list: [...state.list, tab(undefined, action)],
        active: action.id,
        visible: true
      }
    case EDIT_TAB:
      return {
        ...state,
        list: state.list.map(item => {
          if (item.id == action.id) {
            return tab(item, action)
          }
          return item
        })
      }
    case HIDE_TABS:
      return {
        ...state,
        visible: false
      }
    case SHOW_TABS:
      // You can only make the tabs bar visible, when there are tabs
      return {
        ...state,
        visible: state.list.length > 0 ? true : false
      }
    case REMOVE_TAB:
      const list = state.list.filter(item => item.id !== action.id)

      let active = null
      let visible = false

      if (list.length > 0) {
        active = action.id == state.active ? list[list.length - 1].id : state.active
        visible = true
      }

      return {
        ...state,
        list,
        active,
        visible
      }
    case MOVE_TAB:
      return {
        ...state,
        list: moveItemInArray(state.list, action.oldIndex, action.newIndex)
      }
    case MOVE_TAB_TO_THE_LEFT:
      activeIndex = findTabIndex(state.list, action.id)

      return {
        ...state,
        list: moveItemInArray(state.list, activeIndex, activeIndex - 1)
      }
    case MOVE_TAB_TO_THE_RIGHT:
      activeIndex = findTabIndex(state.list, action.id)

      return {
        ...state,
        list: moveItemInArray(state.list, activeIndex, activeIndex + 1)
      }
    case FOCUS_TAB:
      return {
        ...state,
        active: action.id
      }
    case FOCUS_PREV_TAB:
      return {
        ...state,
        active: findTabBeforeActiveTab(state, action.places)
      }
    case FOCUS_NEXT_TAB:
      return {
        ...state,
        active: findTabAfterActiveTab(state, action.places)
      }
    default:
      return state
  }
}

const firstTabId = uuid()

export const defaultState = {
  list: [{
    title: userInfo().username,
    id: firstTabId
  }],
  active: firstTabId,
  visible: false
}

export default tabs
