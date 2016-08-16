
var path = require('path');

var helpers = require('../config/helpers');

module.exports = helpers.extend(
  'webpack.node.js',
  {
    entry: path.resolve(__dirname, '..', '.tmp', 'test'),
    output: {
      path: path.resolve(__dirname, '..', '.tmp', 'test', 'dist')
    }
  }
);
