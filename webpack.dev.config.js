const { spawn } = require('child_process');
const configPaths = require('./webpack/config.path');
const webpackRules = require('./webpack/rules');
const webpackPlugins = require('./webpack/plugins');

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${process.env.NODE_HOST || 'localhost'}:${process.env.NODE_PORT || 8080}/`,
      configPaths.entry
    ]
  },
  output: {
    path: configPaths.buildPath,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: webpackRules
  },
  target: 'electron-renderer',
  plugins: webpackPlugins,
  devtool: 'cheap-module-eval-source-map',
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
    setup() {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      // eslint-disable-next-line no-unused-vars
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError));
    }
  }
};
