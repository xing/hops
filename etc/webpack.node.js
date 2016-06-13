
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
    entry: [
      require.resolve('source-map-support/register'),
      helpers.root
    ],
    output: {
      filename: 'bundle.js',
      library: 'hopsRender',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    devtool: 'cheap-module-eval-source-map',
    externals: [nodeExternals()],
    resolveLoader: {
      alias: {
        'style-loader': 'fake-style-loader',
        'style': 'fake-style-loader'
      }
    }
  }
);
