
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
      return config;
    }
  ),
  {
    filename: __filename,
    target: 'node',
    output: {
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
