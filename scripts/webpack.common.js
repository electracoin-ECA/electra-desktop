const CleanWebpackPlugin = require('clean-webpack-plugin')
const configPaths = require('./config.path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

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
    extensions: [".ts", ".js", ".json"]
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
        from: path.join(configPaths.assetsPath),
        to: path.join(configPaths.buildPath, 'assets'),
        toType: 'dir'
      },
    ]),
  ],

  node: {
    __dirname: false,
  },
}

const rendererConfig = {
  target: 'electron-renderer',

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}

module.exports = [mainConfig, rendererConfig]
