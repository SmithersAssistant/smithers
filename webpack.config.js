const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const path = require('path');
const _ = require('lodash');
const packageJson = require('./package.json');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const noop = () => {};

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : null,
  entry: {
    app: './src/index.js',
    vendor: Object.keys(packageJson.dependencies).filter(item => ! _.includes(['lodash'], item))
  },
  output: {
    path: path.join(__dirname, 'app', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin("vendor", "vendor.chunk.js"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    }),
    new webpack.NoErrorsPlugin(),
    isProduction ? new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      sourceMap: false,
    }) : noop
  ],
  standard: {
    parser: 'babel-eslint'
  },
  target: 'electron-renderer'
};
