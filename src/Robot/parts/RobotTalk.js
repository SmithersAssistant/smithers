import {dispatch, getState} from 'store'
import {setVoice} from 'actions/index'

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

  loadVoices() {
    let voicesInterval = setInterval(() => {
      voices = window.speechSynthesis.getVoices().filter(s => s.localService == true)

      if (voices.length > 0) {
        const savedVoice = getState().settings.voice
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
