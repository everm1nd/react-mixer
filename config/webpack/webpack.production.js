const webpack = require("webpack")

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
      }
    })
  ]
}
