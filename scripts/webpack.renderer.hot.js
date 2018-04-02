const { spawn } = require('child_process')
const [, rendererConfig] = require('./webpack.common.js')
const configPaths = require('./config.path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const PORT = process.env.NODE_PORT || 8080

module.exports = webpackMerge(rendererConfig, {
  devtool: 'inline-source-map',

  entry: [
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?path=http://127.0.0.1:${PORT}/__webpack_hmr&reload=true`,
    configPaths.entryRenderer
  ],

  output: {
    publicPath: `http://127.0.0.1:${PORT}/`
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'react-hot-loader/webpack' },
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
              sourceMap: true,
            },
          }
        ],
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

    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
})
