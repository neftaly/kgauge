const R = require('ramda');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HasteResolverPlugin = require('haste-resolver-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env, { p: isProd } = {}) => ({
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  entry: R.filter(R.identity, [
    'babel-polyfill',
    !isProd && 'react-hot-loader/patch',
    './src/index'
  ]),
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'react-native': 'react-web'
    },
    extensions: [
      '.js',
      '.jsx',
      '.web.js',
      '.web.jsx'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|eot|ttf|woff2?)$/i,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
      }
    ]
  },
  plugins: R.filter(R.identity, [
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: [
        'react-web'
      ]
    }),
    new HtmlWebpackPlugin({
      title: pkg.name,
      template: 'src/index.ejs'
    }),
    !isProd && new webpack.NamedModulesPlugin(),
    isProd && new webpack.optimize.OccurrenceOrderPlugin()
  ])
});
