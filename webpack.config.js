const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const addEnvConfigTo = require('./config/webpack/envResolver')

const BUILD_DIR = path.resolve(__dirname, './src/client/public');
const APP_DIR = path.resolve(__dirname, './src/client/app');

const commonConfig = {
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

const config = addEnvConfigTo(commonConfig)

console.log(config)

export default config;
