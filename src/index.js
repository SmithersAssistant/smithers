import {webFrame} from 'electron'
import React from 'react';
import {render} from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
import pluginManager from 'pluginSystem/pluginManager'

pluginManager.register('help', require('plugins/help'));
pluginManager.register('settings', require('plugins/settings'));
pluginManager.register('tabs', require('plugins/tabs'));

// Listen for notifications
import notifications from './notifications'
notifications.start();

// Disable pinch zoom
webFrame.setZoomLevelLimits(1, 1);

// Render
render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>
), document.getElementById('root'));
