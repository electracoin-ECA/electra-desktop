import { app, BrowserWindow, Event, Menu, Tray } from 'electron'
import * as path from 'path'
import * as url from 'url'

import Communication from './communication'

let isHidden: boolean = false
const isProd: boolean = process.env.NODE_ENV === 'production'
let isQuiting: boolean = false
let mainWindow: BrowserWindow

// Start IPC events bus listener
const communication: Communication = new Communication()

// Instantiate tray item
let tray: Tray

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: !isProd,
    height: 900,
    show: false,
    webPreferences: {
      webSecurity: true
    },
    width: 1500,
  })

  const indexPath: string = !isProd
    ? url.format({
      host: 'localhost:8080',
      pathname: '',
      protocol: 'http:',
      slashes: true,
    })
    : url.format({
      pathname: path.resolve(__dirname, '../renderer/index.html'),
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
  tray = new Tray(path.resolve(__dirname, '../renderer/assets/logo.png'))
  tray.setToolTip('Electra Desktop')
  tray.on('click', toggleMainWindows)

  updateTray()
  createWindow()
})
