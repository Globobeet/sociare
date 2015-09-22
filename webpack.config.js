var webpack = require('webpack'),
  path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "sociare.js"
  },
  module: {
    preLoaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel?optional[]=runtime'
    }]
  }
};
