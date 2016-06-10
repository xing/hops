
var path = require('path');

var nodeExternals = require('webpack-node-externals');

var HopsPlugin = require('../plugin');
var helpers = require('../plugin/helpers');

module.exports = helpers.extendConfig(
  helpers.transform(
    'webpack.base.js',
    function (config) {
      config.plugins = config.plugins.filter(function (plugin) {
        return (plugin.constructor !== HopsPlugin);
      });
      delete config.devtool;
      return config;
    }
  ),
  {
    filename: __filename,
    entry: require.resolve('../shims/node'),
    target: 'node',
    output: {
      path: path.resolve(helpers.root, 'dist'),
      publicPath: '/',
      filename: 'bundle.js',
      library: 'hopsRender'
    },
    resolveLoader: {
      alias: {
        'style': 'fake-style-loader'
      }
    },
    externals: [nodeExternals()]
  }
);
