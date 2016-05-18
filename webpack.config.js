var webpack = require('webpack');
// var path = require('path');

module.exports = {
  entry: "./src/entry.js",
  output: {
    path: __dirname,
    filename: "./dist/bundle.js",
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
    ],
  },
};
