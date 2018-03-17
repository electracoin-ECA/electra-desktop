const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const url = require('url')
const Resource  = require('./electron-resource');
const exec = require('child_process').exec

let mainWindow

let dev = false
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true
}

function createWindow() {
  // Create the browser window.
  exec("kill -9 $(ps aux | grep -m 1 'electrad.*' | awk '{print $2}')", () => { console.log('Stopped daemon') })
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    webPreferences: {
      webSecurity: false
    },
    show: false,
    frame: (process.env.NODE_ENV !== 'production')
  })

  let indexPath
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: '',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }
  mainWindow.loadURL(indexPath)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    if (dev) {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  exec("kill -9 $(ps aux | grep -m 1 'electrad.*' | awk '{print $2}')", () => { console.log('Stopped daemon') })
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})