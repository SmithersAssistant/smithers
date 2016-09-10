import {ipcRenderer} from 'electron'

export default {
  getConfigPath () {
    return ipcRenderer.sendSync('config:getConfigPath')
  },
  getExternalPluginsPath () {
    return ipcRenderer.sendSync('config:getPluginPath')
  },
  get (key, defaultValue) {
    return ipcRenderer.sendSync('config:get', key, defaultValue)
  },
  set (key, value) {
    ipcRenderer.sendSync('config:set', key, value)
  }
}
