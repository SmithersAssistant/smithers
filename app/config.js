const {resolve} = require('path')
const {writeFile, existsSync, readFileSync} = require('fs')
const {app} = require('electron')
const _ = require('lodash')

const CONFIG_PATH = resolve(app.getPath('userData'), 'user.config.json')

const persist = () => {
  writeFile(CONFIG_PATH, JSON.stringify(config, null, '  '))
}

const defaultConfig = () => {
  return {
    plugins: {
      local: [],
      external: []
    },
    keyboardShortcuts: {
      toggleWindow: 'Alt+S'
    }
  }
}

const loadConfig = () => {
  if (existsSync(CONFIG_PATH)) {
    const config = readFileSync(CONFIG_PATH, 'utf8')
    try {
      return JSON.parse(config)
    } catch (e) {
      console.error(`ERROR\n  Could not load config file (${CONFIG_PATH})\n  Check the file, and see what's going on`)
      return defaultConfig()
    }
  }

  writeFile(CONFIG_PATH, JSON.stringify(defaultConfig(), null, '  '))
  return defaultConfig()
}

let config = loadConfig()

const get = (key, defaultValue) => {
  return _.get(config, key, defaultValue)
}

const set = (key, value) => {
  config = _.set(config, key, value)

  persist()
}

module.exports = {
  get,
  set
}
