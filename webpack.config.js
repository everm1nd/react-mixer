var webpack = require('webpack');
var path = require('path');
var Dotenv = require('dotenv-webpack');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    publicPath: "/public/",
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  plugins: [
    new Dotenv({
      safe: true,
      systemvars: true
    })
  ],
  devtool: "#inline-source-map",
  devServer: {
    contentBase: 'src/client/'
  }
};

module.exports = config;
