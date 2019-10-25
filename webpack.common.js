/* eslint-env node */
const path = require('path')
const packageJson = require('./package.json')
const version = packageJson.version

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
          cacheDirectory: true
        }
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.scss'] },
  output: {
    filename: '[name].' + version + '.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          filename: 'vendor.bundle.js',
          test: /[\\/]node_modules[\\/]/,
        }
      }
    }
  }
}
