import { app, BrowserWindow, ipcMain } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { enableLiveReload, addBypassChecker } from 'electron-compile'

let mainWindow

const isDevMode = process.env.NODE_ENV === 'development'

addBypassChecker((path) => path.indexOf(app.getAppPath()) === -1 && (/.{jpg,png}/.test(path)))

if (isDevMode) enableLiveReload()

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // frame: false,
    // titleBarStyle: 'hidden-inset',
    transparent: false
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  if (isDevMode) {
    await installExtension(VUEJS_DEVTOOLS)
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// ipcMain.on('init-bittrex', (event, config) => {
//   apiHelper.init({
//     apikey: config.apiKey,
//     apisecret: config.apiSecret,
//     'baseUrl' : 'https://bittrex.com/api/v1.1',
//     'baseUrlv2' : 'https://bittrex.com/Api/v2.0'
//   })
// })

// ipcMain.on('get-portfolio-data', (event) => {
//   Promise.all([ apiHelper.getParsedMarketData(), apiHelper.getParsedPortfolio() ])
//     .then(data => {
//       const marketData = data[0]  
//       const portfolio = data[1]
//       event.sender.send('log-data', marketData)
//       event.sender.send('log-data', portfolio)
//       const mergedPortfolio = annotateLatestPrices(portfolio, marketData)
//       event.sender.send('log-data', mergedPortfolio)
//       event.sender.send('portfolio-data', mergedPortfolio)
//     })
//     .catch(error => {
//       event.sender.send('portfolio-error', error)
//     })
// })