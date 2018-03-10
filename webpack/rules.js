/* eslint-disable import/no-extraneous-dependencies */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ConfigPath = require('./config.path')

const isProduction = process.argv.indexOf('-p') >= 0

module.exports = [
  {
    test: /\.tsx?$/,
    use: isProduction
      ? 'awesome-typescript-loader?module=es6'
      : [
        'react-hot-loader/webpack',
        'awesome-typescript-loader'
      ]
  },
  {
    test: /\.(css|scss)$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          }
        },
        'postcss-loader',
        { loader: 'sass-loader', query: {} }
      ]
    }),
    include: ConfigPath.stylePaths,
    exclude: [/node_modules/]
  },
  {
    test: /\.jsx?$/,
    use: [{ loader: 'babel-loader' }],
    include: [ConfigPath.sourcePath]
  },
  {
    test: /\.(jpe?g|png|gif)$/i,
    use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
    include: ConfigPath.stylePaths
  },
  {
    test: /\.svg$/,
    loader: 'svg-inline-loader'
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
    include: ConfigPath.stylePaths
  }
]
