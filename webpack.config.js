const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const path = require('path');

const packageJson = require('./package.json');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const noop = () => {};

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : 'devtool',
  entry: {
    app: './src/index.js',
    vendor: Object.keys(packageJson.dependencies).filter(item => ! ['lodash'].includes(item))
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
    isProduction ? new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }) : noop
  ],
  target: 'electron-renderer'
};
