const { spawn } = require('child_process')
const configPaths = require('./config.path')
const webpackRules = require('./rules')
const webpackPlugins = require('./plugins')

module.exports = {
  target: 'electron-renderer',

  output: {
    path: configPaths.buildPath,
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: webpackRules
  },

  plugins: webpackPlugins,
}
