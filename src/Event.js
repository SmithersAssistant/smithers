import {v4 as uuid} from 'uuid';

class Event {
  constructor() {
    this.events = []
  }

  on(event, cb) {
    const id = uuid()

    this.events[event] = this.events[event] || []
    this.events[event].push({id, cb})

    // unsubscribe
    return () => {
      this.events[event] = this.events[event].filter(item => item.id !== id)
    }
  }

  fire(event, ...args) {
    (this.events[event] || []).map(({cb}) => cb(...args))
  }
}

export default new Event()

/**
 * Events
 */
export const FOCUS_INPUT = 'FOCUS_INPUT'
export const PUT_INPUT = 'PUT_INPUT'
export const NOTIFY = 'NOTIFY'
export const OPEN_SETTINGS  = 'OPEN_SETTINGS'
export const OPEN_HELP  = 'OPEN_HELP'
export const SPEECH_RESULT  = 'SPEECH_RESULT'
