const CleanWebpackPlugin = require('clean-webpack-plugin')
const configPaths = require('./config.path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const webpackRules = require('./rules')

const PLATFORM_TO_BINARIY = {
  'darwin': 'electrad-macos',
  'linux': 'electrad-linux',
  'win32': 'electrad-windows.exe',
}

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

  plugins: [
    new CleanWebpackPlugin([configPaths.buildPath], {
      root: process.cwd(),
    }),

    new CopyWebpackPlugin([
      {
        from: path.join(configPaths.assetsPath, 'images'),
        to: path.join(configPaths.buildPath, 'assets'),
        toType: 'dir'
      },
    ]),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  node: {
    __dirname: false,
  },
}

const rendererConfig = {
  target: 'electron-renderer',

  output: {
    path: configPaths.buildPath,
    publicPath: '',
    filename: 'renderer.js'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: webpackRules
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: configPaths.indexTemplate,
    }),

    new ExtractTextPlugin('bundle.css'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}

module.exports = [mainConfig, rendererConfig]
