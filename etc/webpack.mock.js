
var path = require('path');

var helpers = require('../plugin/helpers');

module.exports = helpers.extendConfig(
  helpers.resolve('webpack.node.js'),
  {
    filename: __filename,
    entry: path.resolve(__dirname, '..', '.tmp', 'test'),
    output: {
      path: path.resolve(__dirname, '..', '.tmp', 'test', 'dist')
    }
  }
);
