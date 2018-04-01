const { spawn } = require('child_process')
const [, rendererConfig] = require('./webpack.common.js')
const configPaths = require('./config.path')
const webpackMerge = require('webpack-merge')

const PORT = process.env.NODE_PORT || 8080

module.exports = webpackMerge(rendererConfig, {
  devtool: 'inline-source-map',

  entry: {
    main: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${process.env.NODE_HOST || 'localhost'}:${PORT}`,
      configPaths.entryRenderer
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: configPaths.buildPath,
    publicPath: '/',
    hot: true,
    port: PORT,
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    before() {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
        .on('close',() => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
    }
  }
})
