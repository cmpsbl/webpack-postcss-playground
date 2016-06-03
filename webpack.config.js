import _debug from 'debug';
import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// PostCSS Plugins
import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';
// import precss from 'precss';
import lost from 'lost';
import calc from 'postcss-calc';
import values from 'postcss-modules-values';
import nested from 'postcss-nested';
import modularscale from 'postcss-modular-scale';
import verticalrhythm from 'postcss-vertical-rhythm';
import functions from 'postcss-functions';
import customProperties from 'postcss-custom-properties';
import strip from 'postcss-strip-units';

import { environConfig } from './config';

const { __CSSMODULES__, __DEV__ } = environConfig;
const debug = _debug('app:webpack');

// ------------------------------------
// PostCSS Configuration
// ------------------------------------
const postcssConfig = [
  customProperties,
  functions({
    functions: {
      em: (pixels, context = 15) => {
        return `${pixels / context}em`;
      },
      exponent: (ratio, num = 1) => {
        return Math.pow(ratio, num);
      },
    },
  }),
  verticalrhythm,
  modularscale,
  values,
  strip,
  calc,
  nested,
  rucksack({ fallbacks: true }),
  autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'IE 8', 'IE 9'] }),
  lost,
];


// ------------------------------------
// Style Configuration
// ------------------------------------
const loadCSSLoaders = () => {
  const styleLoader = 'style-loader';
  const enableCSSModules = `css-loader?-minimize&modules&importLoaders=1
  &localIdentName=[name]-[local]___[hash:base64:3]!postcss-loader`;
  const cssLoaders = 'css-loader!postcss-loader';

  const defaultConfig = {
    test: /\.css$/,
  };

  if (__CSSMODULES__) {
    debug('Extract CSS code from JS files and enable CSS Modules');
    defaultConfig.loader = ExtractTextPlugin.extract(styleLoader, enableCSSModules);
  } else {
    debug('Extract CSS code from JS files and DO NOT enable CSS Modules');
    defaultConfig.loader = ExtractTextPlugin.extract(styleLoader, cssLoaders);
  }

  return defaultConfig;
};


// ------------------------------------
// Webpack Configuration
// ------------------------------------
const webpackConfig = {
  // Entry
  context: path.join(__dirname, 'src'),
  entry: {
    app: __DEV__ ?
    [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './entry.js',
    ] :
    [
      './entry.js',
    ],
  },

  // Output
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: __DEV__ ? 'http://localhost:8080/' : '',
  },

  // Plugins
  plugins: [
    new webpack.DefinePlugin(environConfig),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      hash: false,
      inject: 'body',
      minify: {
        collapseWhitespace: false,
      },
    }),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
  ],

  // Loaders
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        query: {
          cacheDirectory: true,
        },
      },
      loadCSSLoaders(),
    ],
  },

  // PostCSS
  postcss: postcssConfig,
};

export default webpackConfig;
