import Thread from '../../Thread'
import { v4 as uuid } from 'uuid'
import { dispatch } from 'store'
import { deleteProps } from 'components/functions'

import { userInfo } from 'os'

import {
  enqueueNotification
} from 'actions/index'

const utils = {
  uuid () {
    return uuid()
  },
  username () {
    return userInfo().username
  },
  padLeft (amount) {
    return amount < 10 ? `0${amount}` : amount
  },
  fetch (url, options = {}) {
    return window.fetch(url, options)
  },
  fetchJson (url, options = {}) {
    return utils.fetch(url, options).then((response) => {
      let json = response.json()

      return response.status >= 200 && response.status < 300
        ? json
        : json.then(Promise.reject.bind(Promise))
    })
  },
  httpBuildQuery (obj, tmpKey) {
    const output = []

    Object.keys(obj).forEach((val) => {
      let key = val

      key = encodeURIComponent(key.replace(/[!'()*]/g, escape))
      tmpKey ? key = `${tmpKey}[${key}]` : ''

      if (typeof obj[ val ] === 'object') {
        const query = utils.httpBuildQuery(obj[ val ], key)
        output.push(query)
        return
      }

      const value = encodeURIComponent(`${obj[ val ]}`.replace(/[!'()*]/g, escape))
      output.push(`${key}=${value}`)
    })

    return output.join('&')
  },
  faviconUrl (url) {
    return `https://www.google.com/s2/favicons?domain=${url}`
  },
  formatURL (url) {
    if (!/^https?:\/\//i.test(url)) {
      url = `http://${url}`
    }

    return url
  },
  jsonToFormData (payload) {
    let form = new window.FormData()

    for (let key in payload) {
      form.append(key, payload[key])
    }

    return form
  },
  delayPromise (duration) {
    return (...args) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(...args)
        }, duration)
      })
    }
  },
  notify: (msg) => dispatch(enqueueNotification(msg)),
  noop: () => {},
  deleteProps,
  Thread
}

export default utils
