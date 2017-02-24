import {v4 as uuid} from 'uuid'
import {userInfo} from 'os'
import reducer from './reducer'

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

const normalize = (title = '', otherwise) => {
  const normalized = title.trim()

  return normalized.length > 0 ? normalized : otherwise
}

const findTabIndex = (list, active) => {
  return list.findIndex(tab => tab.id === active)
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

const tab = reducer({
  [ADD_TAB]: (state, action) => ({
    title: normalize(action.title, 'untitled'),
    id: action.id
  }),
  [EDIT_TAB]: (state, action) => ({
    ...state,
    title: normalize(action.title, 'untitled')
  })
})

const tabs = reducer({
  [ADD_TAB]: (state, action) => ({
    ...state,
    list: [...state.list, tab(undefined, action)],
    active: action.id,
    visible: true
  }),
  [EDIT_TAB]: (state, action) => ({
    ...state,
    list: state.list.map(item => {
      if (item.id === action.id) {
        return tab(item, action)
      }
      return item
    })
  }),
  [HIDE_TABS]: (state, action) => ({
    ...state,
    visible: false
  }),
  [SHOW_TABS]: (state, action) => {
    // You can only make the tabs bar visible, when there are tabs
    if (state.list.length > 0) {
      return {
        ...state,
        visible: state.list.length > 0
      }
    }

    const id = uuid()

    return {
      ...state,
      list: [{
        title: userInfo().username,
        id: id
      }],
      active: id,
      visible: true
    }
  },
  [REMOVE_TAB]: (state, action) => {
    const list = state.list.filter(item => item.id !== action.id)

    let active = null
    let visible = false

    if (list.length > 0) {
      active = action.id === state.active ? list[list.length - 1].id : state.active
      visible = true
    }

    return {
      ...state,
      list,
      active,
      visible
    }
  },
  [MOVE_TAB]: (state, action) => ({
    ...state,
    list: moveItemInArray(state.list, action.oldIndex, action.newIndex)
  }),
  [MOVE_TAB_TO_THE_LEFT]: (state, action) => {
    const activeIndex = findTabIndex(state.list, action.id)

    return {
      ...state,
      list: moveItemInArray(state.list, activeIndex, activeIndex - 1)
    }
  },
  [MOVE_TAB_TO_THE_RIGHT]: (state, action) => {
    const activeIndex = findTabIndex(state.list, action.id)

    return {
      ...state,
      list: moveItemInArray(state.list, activeIndex, activeIndex + 1)
    }
  },
  [FOCUS_TAB]: (state, action) => ({
    ...state,
    active: action.id
  }),
  [FOCUS_PREV_TAB]: (state, action) => ({
    ...state,
    active: findTabBeforeActiveTab(state, action.places)
  }),
  [FOCUS_NEXT_TAB]: (state, action) => ({
    ...state,
    active: findTabAfterActiveTab(state, action.places)
  })
}, [])

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
