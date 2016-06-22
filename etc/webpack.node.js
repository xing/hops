
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var helpers = require('../config/helpers');

module.exports = helpers.extend(
  'webpack.base.js',
  helpers.removePlugin.bind(null, null),
  helpers.removePlugin.bind(null, webpack.DllReferencePlugin),
  {
    target: 'node',
    entry: [
      'source-map-support/register',
      'hops-entry-point'
    ],
    output: {
      filename: 'bundle.js',
      library: 'hopsRender'
    },
    devtool: 'cheap-module-eval-source-map',
    externals: [nodeExternals()],
    cache: {},
    resolveLoader: {
      alias: {
        'style-loader': 'fake-style-loader',
        'style': 'fake-style-loader'
      }
    },
    extend: helpers.extend.bind(null, __filename)
  }
);
