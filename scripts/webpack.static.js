const [mainConfig, rendererConfig] = require('./webpack.common.js')
const configPaths = require('./config.path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

module.exports = [
  webpackMerge(mainConfig, {
    // We don't want any automated minifaction here because it breaks the types-checking.
    // https://webpack.js.org/concepts/mode/#mode-none
    mode: 'none',

    plugins: [
      new webpack.DefinePlugin({
        'process.env.IS_HOT': false,
        'process.env.ELECTRON_IS_LOCAL': Boolean(process.env.ELECTRON_IS_LOCAL),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  }),

  webpackMerge(rendererConfig, {
    mode: 'production',

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
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[local]-[hash:base64:5]',
              },
            }
          ],
          exclude: configPaths.stylePaths,
        },
        {
          test: /\.css$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                }
              },
            ]
          }),
          include: configPaths.stylePaths,
          exclude: [/node_modules/],
        },
        {
          test: /\.woff2?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/font-woff',
            }
          },
        },
        {
          test: /\.sprite\.svg$/,
          loader: 'svg-sprite-loader',
        },
        {
          test: /(?<!sprite)\.(gif|jpe?g|png|svg|webp)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
            }
          }
        },
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
