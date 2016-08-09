import {resolve} from 'path';
import {webFrame, remote} from 'electron';
import React from 'react';
import {render} from 'react-dom';
import config from 'config';
import menuFactory from 'Menu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Event, {UPDATE_AVAILABLE, UPDATE_DOWNLOADED, UPDATE_ERROR, CHECKING_FOR_UPDATES, UPDATE_NOT_AVAILABLE} from 'Event';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const {app, autoUpdater} = remote;

// Import global CSS
import './styles/global.css'
import './styles/nativize.css'

// Import the App
import App from './components/App'

// Load store and provider
import {Provider} from 'react-redux'
import store from './store'

// Put Robot on window
import robot from './Robot'
window.Robot = robot

// Load inhouse plugins
import {DEFAULT_PLUGIN, LOCAL_PLUGIN, EXTERNAL_PLUGIN} from 'pluginSystem/sources';
import pluginManager from 'pluginSystem/pluginManager'

const pluginInfo = ({name, version, location}, source = DEFAULT_PLUGIN) => ({
  name,
  source,
  location,
  version: version || app.getVersion(),
});

// Load Default Plugins
pluginManager.register(pluginInfo({name: 'help'}), require('plugins/help'));
pluginManager.register(pluginInfo({name: 'settings'}), require('plugins/settings'));
pluginManager.register(pluginInfo({name: 'tabs'}), require('plugins/tabs'));

// Load Local Plugins
config.get('plugins.local').map((plugin) => {
  pluginManager.register(
    pluginInfo(plugin, LOCAL_PLUGIN),
    pluginManager.loadPlugin(plugin.location)
  );
});

// Load External Plugins
pluginManager.syncExternalPlugins();
config.onConfigChanged(() => {
  pluginManager.syncExternalPlugins();
});

config.get('plugins.external').map((plugin) => {
  const [pluginName] = plugin.split('@');
  const location = resolve(config.getExternalPluginsPath(), pluginName);

  pluginManager.register(
    pluginInfo({
      version: window.require(resolve(location, 'package.json')).version,
      name: pluginName,
      location
    }, EXTERNAL_PLUGIN),
    pluginManager.loadPlugin(location)
  );
});

// Listen for notifications
import notifications from './notifications'
notifications.start();

// Disable pinch zoom
webFrame.setZoomLevelLimits(1, 1);

// Render menu bar items
menuFactory();

// Auto updater
if (process.env.NODE_ENV !== 'development') {
  autoUpdater.addListener("update-available", (event) => {
    Event.fire(UPDATE_AVAILABLE, {event});
  });

  autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    Event.fire(UPDATE_DOWNLOADED, {event, releaseNotes, releaseName, releaseDate, updateURL});
  });

  autoUpdater.addListener("error", (error) => {
    Event.fire(UPDATE_ERROR, {error});
  });

  autoUpdater.addListener("checking-for-update", (event) => {
    Event.fire(CHECKING_FOR_UPDATES, {event});
  });

  autoUpdater.addListener("update-not-available", (event) => {
    Event.fire(UPDATE_NOT_AVAILABLE, {event});
  });

  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, 5000);
}

// Render
render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>
), document.getElementById('root'));
