import {createStore} from 'redux'
import throttle from 'lodash/throttle'

import {loadState, saveState} from './storage'

// import the root reducer
import rootReducer, { defaultState } from './reducers/index'

const store = createStore(
  rootReducer,
  loadState(defaultState)
)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

const saveFilteredState = throttle(() => {
  window.requestAnimationFrame(() => saveState(store.getState()))
}, 1000)

store.subscribe(() => saveFilteredState())

window.state = () => {
  return store.getState()
}

export const getState = () => store.getState()
export const {dispatch} = store
export default store
