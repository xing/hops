
var path = require('path');

var helpers = require('../plugin/helpers');

module.exports = helpers.extendConfig(
  helpers.resolve('webpack.base.js'),
  {
    filename: __filename,
    entry: require.resolve('../lib/shim'),
    resolve: {
      alias: {
        'hops-main': helpers.root
      }
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.resolve(helpers.root, 'dist'),
      noInfo: true,
      watchOptions: {
        aggregateTimeout: 100
      }
    }
  }
);
