const os = require('os');
const {app, BrowserWindow, autoUpdater, ipcMain} = require('electron');

// Window Management
let win;

const registerAutoUpdater = () => {
  // Auto Updater
  if (process.env.NODE_ENV !== 'development') {
    autoUpdater.setFeedURL(`https://smithers.robinmalfait.com/update/${os.platform()}_${os.arch()}/${app.getVersion()}`);

    autoUpdater.addListener('update-available', () => {
      clearInterval(this._checkUpdatesInterval)
      win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('UPDATE_AVAILABLE')");
    });
    autoUpdater.addListener('update-downloaded', () => {
      win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('UPDATE_DOWNLOADED')");
    });
    autoUpdater.addListener('error', () => {
      win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('UPDATE_ERROR')");
    });
    autoUpdater.addListener('checking-for-update', () => {
      win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('CHECKING_FOR_UPDATES')");
    });
    autoUpdater.addListener('update-not-available', () => {
      win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('UPDATE_NOT_AVAILABLE')");
    });

    ipcMain.on('CHECK_FOR_UPDATES', () => {
      autoUpdater.checkForUpdates();
    })

    this._checkUpdatesInterval = setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 30000);
  } else {
    ipcMain.on('CHECK_FOR_UPDATES', () => {})
  }
};

const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true // Hide menu bar on windows, unless Alt is pressed
  });

  win.on('ready-to-show', () => {
    win.show();
  });

  win.webContents.once("did-frame-finish-load", () => {
    autoUpdater.checkForUpdates();
  })

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', () => {
  createWindow();
  registerAutoUpdater();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  };
});
