/* eslint-env node */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const contentBase =
  process.env.ZONAMA_CONTENT_BASE || path.join(__dirname, 'public/')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        loader: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: contentBase,
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hot: true,
    before: (app, server) => {
      // This lets us keep the stylesheet reference to main.version.css
      // in index.html files while we test
      app.get('/dist/main*.css', function (req, res) {
        res.status(200).type('text/css').send('')
      })
    }
  }
})
