const CleanWebpackPlugin = require('clean-webpack-plugin')
const configPaths = require('./config.path')
const webpackNodeExternals = require('webpack-node-externals')
const webpackPlugins = require('./plugins')
const webpackRules = require('./rules')

const mainConfig = {
  context: process.cwd(),
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
    // new CleanWebpackPlugin([configPaths.buildPath], {
    //   root: process.cwd(),
    // }),
  ],

  node: {
    __dirname: true,
  },
}

const rendererConfig = {
  context: process.cwd(),
  target: 'electron-renderer',

  output: {
    path: configPaths.outputPathRenderer,
    publicPath: '',
    filename: 'index.js'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: webpackRules
  },

  plugins: webpackPlugins,

  node: {
    __dirname: true,
  },

  externals: [
    webpackNodeExternals({
      whitelist: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
      ]
    })
  ],
}

module.exports = [mainConfig, rendererConfig]
