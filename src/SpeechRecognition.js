import Event, {SPEECH_RESULT} from 'Event'

const REC = new window.webkitSpeechRecognition() // eslint-disable-line new-cap
const AVAILABLE_EVENTS = [
  'onaudiostart', 'onaudioend', 'onend', 'onerror',
  'onnomatch', 'onresult', 'onsoundstart', 'onsoundend',
  'onspeechstart', 'onspeechend', 'onstart'
]

class SpeechRecognition {
  constructor () {
    this.listeners = []
    this.started = false
    this.confidence = 0.6

    this.events = {}

    REC.continuous = true
    REC.interimResults = true

    this.addEventListener('onstart', () => {
      this.started = true
    })

    this.addEventListener('onresult', (event) => {
      this.parseResults(event)
    })

    this.addEventListener('onend', () => {
      this.started = false
    })

    // AVAILABLE_EVENTS.forEach(event => {
    //   this.addEventListener(event, (...args) => {
    //     console.log(`[${event}]`, args);
    //   })
    // });
  }

  updateEventListeners () {
    AVAILABLE_EVENTS.forEach(event => {
      REC[event] = (...args) => (this.events[event] || []).forEach(listener => listener(...args))
    })
  }

  addEventListener (event, cb) {
    if (!AVAILABLE_EVENTS.includes(event)) {
      throw new Error(`${event} is not a recognized event`)
    }

    this.events[event] = this.events[event] || []
    this.events[event].push(cb)

    this.updateEventListeners()
  }

  listenFor (regex, cb) {
    this.listeners = [
      ...this.listeners,
      {
        // Allow for [regex1, regex2]
        regex: [].concat(regex),
        cb
      }
    ]
  }

  isListening () {
    return this.started === true
  }

  abort () {
    REC.abort()
  }

  start () {
    // Only start listening if it has not been started yet
    // And if it has listeners
    if (!this.started && this.listeners.length > 0) {
      REC.start()
    }
  }

  stop () {
    REC.stop()
  }

  parseResults (event) {
    Array.prototype.forEach.call(event.results, result => {
      const details = result[0]

      // We are pretty sure now
      if (parseFloat(details.confidence) >= parseFloat(this.confidence)) {
        const contents = details.transcript.trim()

        Event.fire(SPEECH_RESULT, {
          message: contents,
          confidence: details.confidence
        })

        this.listeners.forEach(listener => {
          listener.regex.forEach(regex => {
            if (this.isSaidByUser(regex, contents) && result.isFinal) {
              listener.cb({
                contents,
                regex,
                matches: regex.exec(contents)
              })
            }
          })
        })
      }
    })
  }

  isSaidByUser (regex, contents) {
    return regex.test(contents)
  }

}

export default new SpeechRecognition()
