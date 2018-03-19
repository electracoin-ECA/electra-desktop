const [mainConfig, rendererConfig] = require('./webpack.common.js')
const configPaths = require('./config.path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

module.exports = [
  webpackMerge(mainConfig, {
    context: configPaths.buildPath,

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
    // context: configPaths.outputPathRenderer,

    entry: configPaths.entryRenderer,

    // plugins: [
    //   new CopyWebpackPlugin([
    //     {
    //       from: configPaths
    //     }
    //   ])
    // ],

    // node: {
      // __dirname: 'mock',
    // },

    stats: {
      colors: true,
      children: false,
      chunks: false,
      modules: false
    },
  })
]
