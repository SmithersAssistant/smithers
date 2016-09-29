const os = require('os')
const { app, BrowserWindow, autoUpdater, globalShortcut, ipcMain } = require('electron')
const { get } = require('./config')
const menuFactory = require('./Menu')

// Window Management
let win
let launcher

let updateAvailableMessageShown = false
const noop = () => {}

const registerAutoUpdater = () => {
  // Auto Updater
  if (process.env.NODE_ENV !== 'development') {
    autoUpdater.setFeedURL(`https://download.getsmithers.com/update/${os.platform()}_${os.arch()}/${app.getVersion()}`)

    autoUpdater.addListener('update-available', () => {
      clearInterval(this._checkUpdatesInterval)
      if (!updateAvailableMessageShown) {
        _executeOnMainWindow(() => win.webContents.executeJavaScript("window.Robot.fire('UPDATE_AVAILABLE')"))
      }
      updateAvailableMessageShown = true
    })
    autoUpdater.addListener('update-downloaded', () => {
      _executeOnMainWindow(() => win.webContents.executeJavaScript("window.Robot.fire('UPDATE_DOWNLOADED')"))
    })
    autoUpdater.addListener('error', () => {
      _executeOnMainWindow(() => win.webContents.executeJavaScript("window.Robot.fire('UPDATE_ERROR')"))
    })
    autoUpdater.addListener('checking-for-update', () => {
      _executeOnMainWindow(() => win.webContents.executeJavaScript("window.Robot.fire('CHECKING_FOR_UPDATES')"))
    })
    autoUpdater.addListener('update-not-available', () => {
      _executeOnMainWindow(() => win.webContents.executeJavaScript("window.Robot.fire('UPDATE_NOT_AVAILABLE')"))
    })

    this._checkUpdatesInterval = setInterval(() => {
      autoUpdater.checkForUpdates()
    }, 30000)
  }
}

const _executeOnWindow = (cb, context, creator = () => {}) => {
  if (context === undefined) {
    creator({
      onLoaded () {
        cb()
      }
    })
    return
  }

  cb()
}

const _executeOnMainWindow = (cb) => _executeOnWindow(cb, win, createWindow)
const _executeOnLauncher = (cb) => _executeOnWindow(cb, launcher, createLauncher)

const checkForUpdates = () => {
  if (process.env.NODE_ENV !== 'development') {
    _executeOnMainWindow(() => autoUpdater.checkForUpdates())
  }
}

const openSettings = () => {
  _executeOnMainWindow(() => win.webContents.executeJavaScript("window.Robot.fire('OPEN_SETTINGS')"))
}

const registerShortcuts = (shortcuts = get('keyboardShortcuts')) => {
  globalShortcut.unregisterAll()

  shortcuts.toggleWindow !== "" && globalShortcut.register(shortcuts.toggleWindow, () => {
    const launch = () => {
      _executeOnLauncher(() => {
        launcher.isFocused()
          ? launcher.hide()
          : launcher.show()

        _executeOnMainWindow(() => {
          win.hide()
        })
      })
    }

    if (win !== undefined) {
      if (!win.isFocused()) {
        launch()
      } else {
        _executeOnMainWindow(() => {
          win.hide()
        })
      }
    } else {
      launch()
    }
  })
}

ipcMain.on('quit_and_install', (event) => {
  if (process.env.NODE_ENV !== 'development') {
    autoUpdater.quitAndInstall()
  }
  event.returnValue = true
})

ipcMain.on('unregister_all_shortcuts', (event) => {
  globalShortcut.unregisterAll()
  event.returnValue = true
})

ipcMain.on('register_all_shortcuts', (event, shortcuts) => {
  registerShortcuts(
    shortcuts
      ? JSON.parse(shortcuts)
      : undefined
  )
  event.returnValue = true
})

ipcMain.on('handleinput', (event, value) => {
  _executeOnMainWindow(() => win.webContents.executeJavaScript("window.Robot.execute('" + value + "')"))
  _executeOnLauncher(() => launcher.hide())
  _executeOnMainWindow(() => win.show())

  event.returnValue = true
})

ipcMain.on('hidelauncher', (event) => {
  _executeOnLauncher(() => launcher.hide())
  event.returnValue = true
})

const createLauncher = ({ onLoaded = noop } = {}) => {
  launcher = new BrowserWindow({
    width: 680,
    height: 400,
    frame: false,
    show: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true
  })

  launcher.on('ready-to-show', () => {
    launcher.webContents.executeJavaScript("window.LAUNCHER_MODE = true")
  })

  launcher.webContents.once("did-frame-finish-load", () => {
    onLoaded()
  })

  launcher.loadURL(`file://${__dirname}/launcher.html`)

  launcher.on('closed', () => {
    launcher = undefined
  })
}

const createWindow = ({ onLoaded = noop } = {}) => {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true // Hide menu bar on windows, unless Alt is pressed
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  win.webContents.once("did-frame-finish-load", () => {
    autoUpdater.checkForUpdates()
    onLoaded()
  })

  win.loadURL(`file://${__dirname}/index.html`)

  win.on('closed', () => {
    clearInterval(this._checkUpdatesInterval)
    win = undefined
  })
}

app.on('ready', () => {
  menuFactory({
    checkForUpdates,
    openSettings
  })
  createLauncher()
  createWindow()
  registerAutoUpdater()
  registerShortcuts()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('activate', () => {
  _executeOnMainWindow(() => win.show())
  _executeOnLauncher(() => launcher.hide())
})
