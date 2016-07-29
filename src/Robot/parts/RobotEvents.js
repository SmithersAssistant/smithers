import Event, * as events from 'Event'

export default {
  events,
  on: (event, cb) => {
    return Event.on(event, cb)
  },
  fire: (event, data) => {
    return Event.fire(event, data)
  }
}
