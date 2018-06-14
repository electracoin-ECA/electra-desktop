// tslint:disable-next-line:no-implicit-dependencies
import { ProgressInfo, UpdateInfo } from 'builder-util-runtime'
import { app, BrowserWindow, Event, ipcMain, Menu, Tray } from 'electron'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'
import * as path from 'path'
import * as url from 'url'

import Communication from './communication'
import loadUserSettings from './loadUserSettings'
import setMainMenu from './setMainMenu'

const UPDATE_LOOP_DELAY = 1_200_000

let isHidden = false
const isHot = Boolean(process.env.IS_HOT)
const isProd = process.env.NODE_ENV === 'production'
let isQuiting = false
let isStarting = false
let isUpdating = false
let mainWindow: BrowserWindow

// Logs level
log.transports.console.level = log.transports.file.level = process.env.NODE_ENV === 'production'
  ? false
  : process.env.NODE_ENV === 'development' ? 'silly' : 'debug'

// AutoUpdater configuration
autoUpdater.logger = log
autoUpdater.autoDownload = false

// Force single instance
if (
  app.makeSingleInstance(() => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
) app.quit()

// Start IPC events bus listener
const communication: Communication = new Communication()

// Instantiate tray item
let tray: Tray

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    // tslint:disable-next-line:no-magic-numbers
    height: isProd ? 620 : 900,
    minHeight: 620,
    minWidth: 880,
    show: false,
    titleBarStyle: 'hidden',
    transparent: false,
    webPreferences: {
      devTools: !isProd,
      webSecurity: true,
    },
    // tslint:disable-next-line:no-magic-numbers
    width: isProd ? 880 : 1500,
  })

  const indexPath: string = isHot
    ? url.format({
      host: process.platform === 'darwin' ? '0.0.0.0:8080' : '127.0.0.1:8080',
      pathname: '',
      protocol: 'http:',
      slashes: true,
    })
    : url.format({
      pathname: path.resolve(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })

  mainWindow.loadURL(indexPath)

  mainWindow.once('ready-to-show', async () => {
    if (mainWindow === null) return

    // Maximize window for hot dev mode on Windows
    if (isHot && process.platform === 'win32') {
      mainWindow.maximize()
    } else {
      mainWindow.show()
    }

    // Open Devloper Tools for non-production mode
    if (!isProd) mainWindow.webContents.openDevTools()

    log.info('Starting Electra daemon...')
    isStarting = true
    await communication.electraJs.wallet.startDaemon()
    log.info('Electra daemon started.')
    mainWindow.webContents.send('ipcMain:electraJs:started')
    isStarting = false

    // Listen for Renderer events
    ipcMain.on('ipcRenderer:app:quit', () => exitApp(false))
    ipcMain.on('ipcRenderer:autoUpdater:downloadUpdate', () => {
      isUpdating = true
      autoUpdater.downloadUpdate()
    })
    ipcMain.on('ipcRenderer:autoUpdater:quitAndInstall', () => exitApp(true))

    // Check for updates
    autoUpdater.checkForUpdatesAndNotify()
    setInterval(
      async () => {
        if (isUpdating) return

        // Check if the user allows auto-updates
        const userSettings = await loadUserSettings()
        if (!userSettings.settings.autoUpdate) return

        autoUpdater.checkForUpdatesAndNotify()
      },
      UPDATE_LOOP_DELAY,
    )
  })

  mainWindow.on('close', (event: Event) => {
    if (isQuiting) return

    event.preventDefault()
    toggleMainWindows()
  })
}

function updateTray(): void {
  const contextMenu: Menu = Menu.buildFromTemplate(
    (isHidden
      ? [
        {
          click: toggleMainWindows,
          label: 'Show Electra Desktop',
        },
      ]
      : [
        {
          click: toggleMainWindows,
          label: 'Minimize to Tray',
        },
      ]
    ).concat(
      [
        {
          click: () => exitApp(false),
          label: 'Exit',
        },
      ],
    ),
  )
  tray.setContextMenu(contextMenu)
}

// tslint:disable-next-line:typedef
async function exitApp(toInstallUpdate = false): Promise<void> {
  if (isStarting || (isUpdating && !toInstallUpdate)) return
  isQuiting = true

  try {
    mainWindow.webContents.send('ipcMain:app:quit')
    if (communication.electraJs.wallet.daemonState !== 'STOPPED') {
      log.info('Closing Electra daemon...')
      await communication.electraJs.wallet.stopDaemon()
    }
  }
  catch (err) {
    log.error(err)

    if (toInstallUpdate) {
      autoUpdater.quitAndInstall()
    } else {
      app.quit()
    }
  }

  if (toInstallUpdate) {
    autoUpdater.quitAndInstall()
  } else {
    app.quit()
  }
}

function toggleMainWindows(): void {
  if (isHidden) {
    mainWindow.show()
    isHidden = false
    updateTray()

    return
  }

  mainWindow.hide()
  isHidden = true
  updateTray()
}

// autoUpdater.on('checking-for-update', () => {
//   mainWindow.webContents.send('ipcMain:autoUpdater:checking')
// })
autoUpdater.on('update-available', (info: UpdateInfo) => {
  mainWindow.webContents.send('ipcMain:autoUpdater:found', JSON.stringify(info))
})
/*autoUpdater.on('update-not-available', (info: any) => {
  mainWindow.webContents.send('ipcMain:autoUpdater:notFound', JSON.stringify(info))
})
autoUpdater.on('error', (err: any) => {
  mainWindow.webContents.send('ipcMain:autoUpdater:error', JSON.stringify(err))
})*/
autoUpdater.on('download-progress', (progressObj: ProgressInfo) => {
  mainWindow.webContents.send('ipcMain:autoUpdater:progress', JSON.stringify(progressObj))
})
autoUpdater.on('update-downloaded', (info: any) => {
  mainWindow.webContents.send('ipcMain:autoUpdater:downloaded', JSON.stringify(info))
})

app.once('ready', () => {
  log.info('Electra Desktop starting...')

  // Tray initialization
  tray = new Tray(path.resolve(__dirname, process.platform === 'linux'
    ? 'assets/icons/tray@2x.png'
    : 'assets/icons/tray.png',
  ))
  tray.setToolTip('Electra Desktop')
  tray.on('click', toggleMainWindows)
  updateTray()

  // Enable copy, paste and other common shortcuts on MacOS
  // tslint:disable-next-line:no-unnecessary-callback-wrapper
  if (process.platform === 'darwin') setMainMenu(() => exitApp(false))

  createWindow()
})
