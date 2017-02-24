import reducer from './reducer'

import {
  ENQUEUE_NOTIFICATION,
  DEQUEUE_NOTIFICATION
} from '../actions/types'

const notifications = reducer({
  [ENQUEUE_NOTIFICATION]: (state, action) => ([action.msg, ...state]),
  [DEQUEUE_NOTIFICATION]: (state, action) => state.slice(0, state.length - 1)
}, [])

export const defaultState = []

export default notifications
