
var path = require('path');

var helpers = require('../plugin/helpers');

module.exports = helpers.extendConfig(
  helpers.resolve('webpack.base.js'),
  {
    filename: __filename,
    devtool: 'source-map',
    output: {
      pathinfo: true
    },
    devServer: {
      contentBase: path.resolve(helpers.root, 'dist'),
      noInfo: true,
      watchOptions: {
        aggregateTimeout: 100
      }
    }
  }
);
