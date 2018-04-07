/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const { spawn } = require('child_process')
const cors = require('cors')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackRendererConfig = require('./webpack.renderer.hot')

const app = express()
const compiler = webpack(webpackRendererConfig)
const PORT = process.env.PORT || 8080

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  publicPath: webpackRendererConfig.output.publicPath,
  stats: {
    colors: true
  }
})

app.use(cors())
app.use(webpackDevMiddlewareInstance)
app.use(webpackHotMiddleware(compiler))
app.use((req, res, next) => res.redirect('/'))

const server = app.listen(PORT, '127.0.0.1', serverError => {
  if (serverError) {
    return console.error(serverError)
  }

  spawn('npm', ['run', 'start:renderer'], { shell: true, env: process.env, stdio: 'inherit' })
    .on('close', code => process.exit(code))
    .on('error', spawnError => console.error(spawnError))

  console.log(`Listening at http://127.0.0.1:${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('Stopping dev server')
  webpackDevMiddlewareInstance.close()
  server.close(() => {
    process.exit(0)
  })
})
