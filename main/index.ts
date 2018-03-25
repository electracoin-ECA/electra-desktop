import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

import Communication from './middlewares/communication'

// Start IPC events bus listener
const communication: Communication = new Communication()

let mainWindow: BrowserWindow | null

// const isDev: boolean =
//   process.defaultApp
//   || /[\\/]electron-prebuilt[\\/]/.test(process.execPath)
//   || /[\\/]electron[\\/]/.test(process.execPath)
const isProd: boolean = process.env.NODE_ENV === 'production'

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: !isProd,
    height: 900,
    show: false,
    webPreferences: {
      webSecurity: false
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

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', async () => {
  console.info('Closing Electra daemon...')
  await communication.electraJs.wallet.stopDaemon()

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
