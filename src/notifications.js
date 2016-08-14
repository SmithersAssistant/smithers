import {getNotifications} from 'state'
import store, {dispatch} from 'store'
import {dequeueNotification} from 'actions/index'

let isActive = false

const next = () => {
  dispatch(dequeueNotification())
}

const showNotification = () => {
  const notifications = getNotifications()

  const hasMessage = notifications.length > 0
  const body = notifications[notifications.length - 1]

  if (hasMessage) {
    new Notification('Smithers', {body})
    isActive = true

    setTimeout(() => {
      isActive = false
      next()
    }, 4000)
  }
}

export default {
  start () {
    store.subscribe(() => {
      if (!isActive) {
        showNotification()
      }
    })
  }
}
