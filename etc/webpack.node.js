
var fs = require('fs');
var path = require('path');

var WebpackConfig = require('webpack-config').default;

var config = require('../lib/config');
var HopsPlugin = require('../plugin');

var modifiedBaseConfig = {};
modifiedBaseConfig[config.webpackBase] = function (baseConfig) {
  baseConfig.plugins = baseConfig.plugins.filter(function (plugin) {
    return (plugin.constructor !== HopsPlugin);
  });
  delete baseConfig.devtool;
  return baseConfig;
};

module.exports = new WebpackConfig().extend(modifiedBaseConfig).merge({
  filename: __filename,
  entry: require.resolve('../shims/node'),
  target: 'node',
  output: {
    path: path.resolve(config.appRoot, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    library: 'hopsRender'
  },
  resolveLoader: {
    alias: {
      'style-loader': 'fake-style-loader',
      'style': 'fake-style-loader'
    }
  },
  externals: fs.readdirSync(path.join(config.appRoot, 'node_modules')).reduce(
    function (result, mod) {
      if (mod !== '.bin') {
        result[mod] = 'commonjs ' + mod;
      }
      return result;
    },
    {}
  )
});
