const { spawn } = require('child_process')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const configPaths = require('./config.path')
const path = require('path')
const webpackRules = require('./rules')
const webpackPlugins = require('./plugins')

const mainConfig = {
  target: 'electron-main',

  entry: configPaths.entryMain,

  output: {
    path: configPaths.outputPathMain,
    filename: 'index.js'
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

  plugins: [
    new CleanWebpackPlugin([configPaths.buildPath], {
      root: process.cwd(),
    }),
    new CopyWebpackPlugin([
      {
        from: configPaths.binariesPathFrom,
        to: configPaths.binariesPathTo,
      }
    ])
  ],

  node: {
    __dirname: false,
  },
}

const rendererConfig = {
  target: 'electron-renderer',

  output: {
    path: configPaths.outputPathRenderer,
    publicPath: '/',
    filename: 'index.js'
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
