import {resolve} from 'path'
import {webFrame, remote} from 'electron'
import React from 'react'
import {render} from 'react-dom'
import config from 'config'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {getThemePalette} from 'state'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const {app} = remote

// Import global CSS
import './styles/global.css'
import './styles/nativize.css'

// Load store and provider
import {Provider} from 'react-redux'
import store from './store'

// Put Robot on window
import robot from './Robot'
window.Robot = robot

// Load inhouse plugins
import {DEFAULT_PLUGIN, LOCAL_PLUGIN, EXTERNAL_PLUGIN} from 'pluginSystem/sources'
import pluginManager from 'pluginSystem/pluginManager'

const pluginInfo = ({name, version, location}, source = DEFAULT_PLUGIN) => ({
  name,
  source,
  location,
  version: version || app.getVersion()
})

// Load Default Plugins
pluginManager.register(pluginInfo({name: 'help'}), require('plugins/help'))
pluginManager.register(pluginInfo({name: 'settings'}), require('plugins/settings'))
pluginManager.register(pluginInfo({name: 'tabs'}), require('plugins/tabs'))
pluginManager.register(pluginInfo({name: 'spm'}), require('plugins/spm'))
pluginManager.register(pluginInfo({name: 'share'}), require('plugins/share'))
pluginManager.register(pluginInfo({name: 'auth'}), require('plugins/auth'))

// Load Local Plugins
config.get('plugins.local').map((plugin) => {
  pluginManager.register(
    pluginInfo(plugin, LOCAL_PLUGIN),
    pluginManager.loadPlugin(plugin.location)
  )
})

config.get('plugins.external').map((plugin) => {
  const [pluginName] = plugin.split('@')
  const location = resolve(config.getExternalPluginsPath(), pluginName)

  pluginManager.register(
    pluginInfo({
      version: window.require(resolve(location, 'package.json')).version,
      name: pluginName,
      location
    }, EXTERNAL_PLUGIN),
    pluginManager.loadPlugin(location)
  )
})

// Listen for notifications
import notifications from './notifications'
notifications.start()

// Disable pinch zoom
webFrame.setZoomLevelLimits(1, 1)

export default (Application, props = {}) => {
  // Render
  render((
    <MuiThemeProvider muiTheme={getMuiTheme({palette: getThemePalette()})}>
      <Provider store={store}>
        <Application {...props} />
      </Provider>
    </MuiThemeProvider>
  ), document.getElementById('root'))
}
