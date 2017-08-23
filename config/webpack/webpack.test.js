import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
      }
    })
  ]
};
