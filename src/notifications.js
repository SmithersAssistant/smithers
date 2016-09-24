import { getNotifications } from 'state'
import store, { dispatch } from 'store'
import { dequeueNotification } from 'actions/index'

const next = () => {
  dispatch(dequeueNotification())
}

const showNotification = () => {
  const notifications = getNotifications()

  const hasMessage = notifications.length > 0
  const body = notifications[notifications.length - 1]

  if (hasMessage) {
    new window.Notification('Smithers', { body }) // eslint-disable-line no-new
    setTimeout(next, 0)
  }
}

export default {
  start () {
    store.subscribe(() => {
      showNotification()
    })
  }
}
