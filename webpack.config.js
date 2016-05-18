var webpack = require('webpack')
var path = require('path')

var ExtractTextPlugin = require("extract-text-webpack-plugin")
var rucksack = require('rucksack-css')

module.exports = {
  // Entry
  context: path.join(__dirname, 'src'),
  entry: "./entry.js",

  // Output
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "./bundle.js"
  },

  // Loaders
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  },

  // PostCSS Configurations
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],

  // Plugins
  plugins: [
    new ExtractTextPlugin("bundle.css", { allChunks: true })
  ]
}
