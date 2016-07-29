import {
  ENQUEUE_NOTIFICATION,
  DEQUEUE_NOTIFICATION
} from './types'

export const enqueueNotification = (msg) => ({
  type: ENQUEUE_NOTIFICATION,
  msg
})

export const dequeueNotification = () => ({
  type: DEQUEUE_NOTIFICATION
})
