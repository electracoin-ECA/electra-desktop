const { resolve } = require('path')
const configCommon = require('./webpack.common.js')
const configPaths = require('./config.path')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(configCommon, {
  // context: resolve(__dirname, 'src'),

  entry: configPaths.entry,

  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
})
