const { resolve } = require('path')
const configPaths = require('./config.path')
const webpackRules = require('./rules')
const webpackPlugins = require('./plugins')

module.exports = {
  entry: configPaths.entry,
  context: resolve(__dirname, 'src'),
  output: {
    path: configPaths.buildPath,
    publicPath: './',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: webpackRules
  },
  target: 'electron-renderer',
  plugins: webpackPlugins,
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
}
