'use strict';

var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var helpers = require('./helpers');

module.exports = helpers.extend(
  './webpack.base.js',
  helpers.removeLoader.bind(null, 'css'),
  helpers.removePlugin.bind(null, null),
  helpers.removePlugin.bind(null, webpack.DllReferencePlugin),
  function (config) { delete config.resolve.mainFields; return config; },
  {
    target: 'node',
    entry: [
      'source-map-support/register',
      'hops-entry-point'
    ],
    output: {
      filename: 'bundle.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: [
          {
            loader: 'css-loader/locals',
            query: {
              sourceMap: true,
              modules: true,
              localIdentName: '[folder]-[name]-[local]-[hash:base64:5]',
              importLoaders: 1
            }
          },
          'postcss'
        ]
      }]
    },
    devtool: '#inline-source-map',
    externals: [nodeExternals()],
    cache: {},
    resolve: {
      mainFields: ['main']
    }
  }
);
