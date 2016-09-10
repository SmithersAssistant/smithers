const os = require('os')
const {app, BrowserWindow, autoUpdater, globalShortcut, ipcMain} = require('electron')
const {get} = require('./config')
const menuFactory = require('./Menu')

// Window Management
let win

let updateAvailableMessageShown = false
const noop = () => {}

const registerAutoUpdater = () => {
  // Auto Updater
  if (process.env.NODE_ENV !== 'development') {
    autoUpdater.setFeedURL(`https://smithers.robinmalfait.com/update/${os.platform()}_${os.arch()}/${app.getVersion()}`)

    autoUpdater.addListener('update-available', () => {
      clearInterval(this._checkUpdatesInterval)
      if (!updateAvailableMessageShown) {
        win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('UPDATE_AVAILABLE')")
      }
      updateAvailableMessageShown = true
    })
    autoUpdater.addListener('update-downloaded', () => {
      win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('UPDATE_DOWNLOADED')")
    })
    autoUpdater.addListener('error', () => {
      win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('UPDATE_ERROR')")
    })
    autoUpdater.addListener('checking-for-update', () => {
      win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('CHECKING_FOR_UPDATES')")
    })
    autoUpdater.addListener('update-not-available', () => {
      win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('UPDATE_NOT_AVAILABLE')")
    })

    this._checkUpdatesInterval = setInterval(() => {
      autoUpdater.checkForUpdates()
    }, 30000)
  }
}

const _executeOnWindow = (cb) => {
  if (win === undefined) {
    createWindow({
      onLoaded () {
        cb()
      }
    })
    return
  }

  cb()
}

const checkForUpdates = () => {
  if (process.env.NODE_ENV !== 'development') {
    _executeOnWindow(() => autoUpdater.checkForUpdates())
  }
}

const openSettings = () => {
  _executeOnWindow(() => win !== undefined && win.webContents.executeJavaScript("window.Robot.fire('OPEN_SETTINGS')"))
}

const registerShortcuts = (shortcuts = get('keyboardShortcuts')) => {
  globalShortcut.unregisterAll()

  shortcuts.toggleWindow !== "" && globalShortcut.register(shortcuts.toggleWindow, () => {
    if (win !== undefined) {
      win.isFocused()
        ? win.hide()
        : win.show()
    }
  })
}

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

const createWindow = ({onLoaded = noop} = {}) => {
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
    win.webContents.openDevTools()
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
  if (win === undefined) {
    createWindow()
  } else {
    win.show()
  }
})
