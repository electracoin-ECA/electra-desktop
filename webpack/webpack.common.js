const CleanWebpackPlugin = require('clean-webpack-plugin')
const configPaths = require('./config.path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const webpackRules = require('./rules')

const mainConfig = {
  target: 'electron-main',

  entry: configPaths.entryMain,

  output: {
    path: configPaths.distPath,
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

  plugins: [
    new CleanWebpackPlugin([configPaths.distPath], {
      root: process.cwd(),
    }),

    new CopyWebpackPlugin([
      {
        from: path.join(configPaths.assetsPath, 'images'),
        to: path.join(configPaths.distPath, 'assets'),
        toType: 'dir'
      },
      {
        from: path.join(configPaths.binariesPath),
        to: path.join(configPaths.distPath, 'bin'),
        toType: 'dir',
        ignore: ['.gitkeep'],
      },
    ]),
  ],

  node: {
    __dirname: false,
  },
}

const rendererConfig = {
  target: 'electron-renderer',

  output: {
    path: configPaths.distPath,
    publicPath: '',
    filename: 'renderer.js'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: webpackRules
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: configPaths.indexTemplate
    }),

    new ExtractTextPlugin('bundle.css'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('development')
    })
  ],
}

module.exports = [mainConfig, rendererConfig]
