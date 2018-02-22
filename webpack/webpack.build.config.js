const { resolve } = require('path');
const configPaths = require('./webpack/config.path');
const webpackRules = require('./webpack/rules');
const webpackPlugins = require('./webpack/plugins');

module.exports = {
  entry: configPaths.entry,
  context: resolve(__dirname, 'src'),
  output: {
    path: configPaths.buildPath,
    publicPath: './',
    filename: 'bundle.js'
  },
  module: {
    rules: webpackRules
  },
  target: 'electron-renderer',
  plugins: webpackPlugins,
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
};
