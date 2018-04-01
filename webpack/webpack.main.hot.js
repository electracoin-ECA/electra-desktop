const [mainConfig] = require('./webpack.common.js')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(mainConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_HOT': true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})
