const { spawn } = require('child_process')

// Config directories


const configPaths = require('./config.path')
const webpackRules = require('./rules')
const webpackPlugins = require('./plugins')

module.exports = {
  entry: configPaths.entry,
  output: {
    path: configPaths.buildPath,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: webpackRules
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  target: 'electron-renderer',
  plugins: webpackPlugins,
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: configPaths.buildPath,
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    setup () {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      // eslint-disable-next-line no-unused-vars
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
    }
  }
}
