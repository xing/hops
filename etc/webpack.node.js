
var nodeExternals = require('webpack-node-externals');

var helpers = require('../config/helpers');

module.exports = helpers.extend(
  'webpack.base.js',
  helpers.removePlugin.bind(null, null),
  {
    target: 'node',
    entry: [
      require.resolve('source-map-support/register'),
      helpers.root
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
