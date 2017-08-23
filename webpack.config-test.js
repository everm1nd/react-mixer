const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const addEnvConfigTo = require('./config/webpack/envResolver')

const path = require('path');
const BUILD_DIR = path.resolve(__dirname, './src/client/public');
const APP_DIR = path.resolve(__dirname, './src/client/app');

import nodeExternals from 'webpack-node-externals';

export default {
  target: 'node',
  externals: [nodeExternals()],
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
        loader : 'babel-loader'
      }
    ]
  },
  plugins: [
    new Dotenv({
      safe: true,
      systemvars: true
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development' // use 'development' unless process.env.NODE_ENV is defined
    })
  ]
};
