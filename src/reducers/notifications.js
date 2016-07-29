import {
  ENQUEUE_NOTIFICATION,
  DEQUEUE_NOTIFICATION
} from '../actions/types'

const notifications = (state = [], action) => {
  switch (action.type) {
    case ENQUEUE_NOTIFICATION:
      return [
        action.msg,
        ...state
      ]
    case DEQUEUE_NOTIFICATION:
      const newState = state.slice()
      newState.pop()
      return [
        ...newState
      ]
    default:
      return state
  }
}

export const defaultState = []

export default notifications
