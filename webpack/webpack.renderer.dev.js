const { spawn } = require('child_process')
const [mainConfig, rendererConfig] = require('./webpack.common.js')
const configPaths = require('./config.path')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(rendererConfig, {
  devtool: 'inline-source-map',

  entry: {
    main: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${process.env.NODE_HOST || 'localhost'}:${process.env.NODE_PORT || 8080}/`,
      configPaths.entry
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: configPaths.buildPath,
    publicPath: '/',
    hot: true,
    port: process.env.NODE_PORT || 8080,
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
        // eslint-disable-next-line no-unused-vars
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
    }
  }
})
