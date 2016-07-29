import {v4 as uuid} from 'uuid'
import {dispatch} from 'store'
import {deleteProps} from 'components/functions'
import {remote, ipcRenderer} from 'electron'

import {userInfo} from 'os'

import {
  enqueueNotification
} from 'actions/index'

const utils = {
  uuid() {
    return uuid()
  },
  username() {
    return userInfo().username
  },
  padLeft(amount) {
    return amount < 10 ? `0${amount}` : amount
  },
  fetch(url, options = {}) {
    return fetch(url, options)
  },
  fetchJson(url, options = {}) {
    return utils.fetch(url, options).then((res) => res.json())
  },
  httpBuildQuery(obj, num_prefix, temp_key) {
    const output_string = [];

    Object.keys(obj).forEach((val) => {
      let key = val;

      num_prefix && !isNaN(key) ? key = num_prefix + key : ''

      key = encodeURIComponent(key.replace(/[!'()*]/g, escape));
      temp_key ? key = `${temp_key}[${key}]` : ''

      if (typeof obj[val] === 'object') {
        const query = utils.httpBuildQuery(obj[val], null, key);
        output_string.push(query)
      } else {
        const value = encodeURIComponent(obj[val].replace(/[!'()*]/g, escape));
        output_string.push(`${key}=${value}`)
      }

    })

    return output_string.join('&')
  },
  faviconUrl(url) {
    return `https://www.google.com/s2/favicons?domain=${url}`
  },
  formatURL(url) {
    if (!/^https?:\/\//i.test(url)) {
      url = `http://${url}`
    }

    return url
  },
  jsonToFormData(payload) {
    let form = new FormData()

    for (let key in payload) {
      form.append(key, payload[key])
    }

    return form
  },
  delayPromise(duration) {
    return (...args) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(...args);
        }, duration)
      });
    };
  },
  notify: (msg) => dispatch(enqueueNotification(msg)),
  noop: () => {
  },
  deleteProps
}

export default utils
