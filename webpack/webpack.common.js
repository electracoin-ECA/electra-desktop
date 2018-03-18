const { spawn } = require('child_process')
const configPaths = require('./config.path')
const path = require('path')
const webpackRules = require('./rules')
const webpackPlugins = require('./plugins')

const mainConfig = {
  target: 'electron-main',

  entry: configPaths.entryMain,

  output: {
    path: configPaths.buildPath,
    filename: 'main.js'
  },

  resolve: {
    extensions: [".ts", ".json"]
  },

  module: {
    loaders: [
      {
        test: /.*\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: configPaths.tsconfigMain,
        }
      },
    ],
  },

  node: {
    __dirname: false,
  },
}

const rendererConfig = {
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

module.exports = [mainConfig, rendererConfig]
