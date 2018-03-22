const configPaths = require('./config.path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const WebpackPlugins = [
  new HtmlWebpackPlugin({
    template: configPaths.indexTemplate
  }),

  new CopyWebpackPlugin([
    {
      from: path.join(configPaths.assetsPath, 'images'),
      to: path.join(configPaths.outputPathRenderer, 'assets'),
      toType: 'dir'
    }
  ]),

  new ExtractTextPlugin('bundle.css'),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('development')
  })
]

module.exports = WebpackPlugins
