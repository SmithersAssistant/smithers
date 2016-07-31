import {dispatch} from 'store'
import {getVoice} from 'stateHelpers'
import {setVoice} from 'actions/index'
import speechRecognition from 'SpeechRecognition'

let voices = []
let voice = null

export default {
  speak(msg, opts = {}) {
    msg = new window.SpeechSynthesisUtterance(msg)
    msg.voice = voice

    for (const key in opts) {
      msg[key] = opts[key]
    }

    window.speechSynthesis.speak(msg)
  },
  
  hear(regex, cb) {
    speechRecognition.listenFor(regex, cb)
  },

  speechAddEventListener(event, cb) {
    speechRecognition.addEventListener(event, cb);
  },

  isListening() {
    return speechRecognition.isListening();
  },

  abortListening() {
    speechRecognition.abort();
  },

  startListening() {
    speechRecognition.start();
  },

  stopListening() {
    speechRecognition.stop();
  },

  loadVoices() {
    let voicesInterval = setInterval(() => {
      voices = window.speechSynthesis.getVoices().filter(s => s.localService == true)

      if (voices.length > 0) {
        const savedVoice = getVoice()
        voice = voices.find(v => v.name === savedVoice)

        if (voice === null || voice === undefined) {
          voice = voices[0]
        }

        if (voice.name !== savedVoice) {
          dispatch(setVoice(voice.name))
        }

        clearInterval(voicesInterval)
      }
    }, 100)
  }
}
