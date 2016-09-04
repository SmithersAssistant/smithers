const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const noop = () => {};

const node_modules = fs.readdirSync('node_modules').filter((x) => x !== '.bin');

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : null,
  entry: ['babel-polyfill',   './src/index.js'],
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
  target: 'electron-renderer',
  externals: [nodeExternals({
    whitelist: ['babel-polyfill', 'regenerator-runtime/runtime']
  })]
};
