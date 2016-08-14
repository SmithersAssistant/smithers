const STORAGE_STATE_KEY = '@@state'

export const loadState = (defaultState, key = STORAGE_STATE_KEY) => {
  // Array
  if (Object.prototype.toString.call(defaultState) === '[object Array]') {
    return [
      ...defaultState,
      ...(JSON.parse(window.localStorage.getItem(key)) || [])
    ]
  }

  // Object
  return {
    ...defaultState,
    ...(JSON.parse(window.localStorage.getItem(key)) || {})
  }
}

export const saveState = (state, key = STORAGE_STATE_KEY) => {
  window.localStorage.setItem(key, JSON.stringify(state))
}
