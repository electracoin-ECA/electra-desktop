const [mainConfig, rendererConfig] = require('./webpack.common.js')
const configPaths = require('./config.path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

module.exports = [
  webpackMerge(mainConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
    ],

    node: {
      __dirname: false,
    },
  }),

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
