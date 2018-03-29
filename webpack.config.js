const webpack = require('webpack');
const path = require('path');

let config = {
  mode: 'development',
  entry: {
    filename: path.join(__dirname, 'public', 'js', 'index'),
  },
  output: {
    filename: 'output.js'
  },
  devServer: {
    contentBase: './',
    compress: true,
    port: 8080
  }
};

module.exports = config;