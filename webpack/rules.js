/* eslint-disable import/no-extraneous-dependencies */
const configPaths = require('./config.path')
const extractTextPlugin = require('extract-text-webpack-plugin')

const isHot = Boolean(process.env.IS_HOT)

module.exports = [
  {
    test: /\.tsx?$/,
    use: (isHot ? [{ loader: 'react-hot-loader/webpack' }] : []).concat([
      {
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: configPaths.tsconfigRenderer,
        }
      }
    ])
  },
  {
    test: /\.css$/,
    loader: 'style-loader',
  },
  {
    test: /\.css$/,
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[local]-[hash:base64:5]',
      sourceMap: true,
    },
  },
  {
    test: /\.scss$/,
    use: extractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        { loader: 'sass-loader', query: {} }
      ]
    }),
    include: configPaths.stylePaths,
    exclude: [/node_modules/]
  },
  {
    test: /\.(jpe?g|png|gif)$/i,
    use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
    include: configPaths.stylePaths
  },
  {
    test: /\.svg$/,
    loader: 'svg-sprite-loader'
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
    include: configPaths.stylePaths
  }
]
