const [mainConfig, rendererConfig] = require('./webpack.common.js')
const configPaths = require('./config.path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

module.exports = [
  webpackMerge(mainConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.IS_HOT': false,
        'process.env.ELECTRON_IS_DEV': Boolean(process.env.ELECTRON_IS_DEV),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  }),

  webpackMerge(rendererConfig, {
    entry: configPaths.entryRenderer,

    output: {
      path: configPaths.buildPath,
      publicPath: '',
      filename: 'renderer.js'
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: configPaths.tsconfigRenderer,
              }
            }
          ],
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
          use: ExtractTextWebpackPlugin.extract({
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
          exclude: [/node_modules/],
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
          include: configPaths.stylePaths
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
          include: configPaths.stylePaths,
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: configPaths.indexTemplate,
      }),

      new ExtractTextWebpackPlugin('bundle.css'),
    ],

    stats: {
      colors: true,
      children: false,
      chunks: false,
      modules: false
    },
  })
]
