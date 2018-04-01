import { app, BrowserWindow, Event, ipcMain, Menu, Tray } from 'electron'
import * as path from 'path'
import * as url from 'url'

import Communication from './communication'

let isHidden: boolean = false
const isHot: boolean = Boolean(process.env.IS_HOT)
const isProd: boolean = process.env.NODE_ENV === 'production'
let isQuiting: boolean = false
let mainWindow: BrowserWindow

// Start IPC events bus listener
const communication: Communication = new Communication()

// Instantiate tray item
let tray: Tray

// Allow main process to send events to renderer process
let rendererProcessSender: any
ipcMain.on('app:quit:listen', (event: any) => rendererProcessSender = event.sender)

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: !isProd,
    height: 900,
    show: false,
    webPreferences: {
      devTools: !isProd,
      webSecurity: true
    },
    width: 1500,
  })

  const indexPath: string = isHot
    ? url.format({
      host: 'localhost:8080',
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

  mainWindow.once('ready-to-show', () => {
    if (mainWindow === null) return

    mainWindow.show()
    if (!isProd) mainWindow.webContents.openDevTools()
  })

  mainWindow.on('minimize', (event: Event) => {
    event.preventDefault()
    toggleMainWindows()
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
          label: 'Mimize to Tray',
        },
      ]
    ).concat(
      [
        {
          click: async (): Promise<void> => {
            isQuiting = true
            rendererProcessSender.send('app:quit')
            console.info('Closing Electra daemon...')
            await communication.electraJs.wallet.stopDaemon()

            if (process.platform !== 'darwin') app.quit()
          },
          label: 'Exit',
        },
      ]
    )
  )
  tray.setContextMenu(contextMenu)
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

app.once('ready', () => {
  tray = new Tray(path.resolve(__dirname, 'assets/icons/tray.png'))
  tray.setToolTip('Electra Desktop')
  tray.on('click', toggleMainWindows)

  updateTray()
  createWindow()
})
