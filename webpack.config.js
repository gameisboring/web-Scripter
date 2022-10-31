const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './bin/www',
  output: {
    filename: 'bundle.js',
  },
  mode: 'production',
  target: 'node',
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
}
