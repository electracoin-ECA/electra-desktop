const [mainConfig, rendererConfig] = require('./webpack.common.js')
const configPaths = require('./config.path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

module.exports = [
  mainConfig,

  webpackMerge(rendererConfig, {
    entry: configPaths.entryRenderer,

    stats: {
      colors: true,
      children: false,
      chunks: false,
      modules: false
    },
  })
]
