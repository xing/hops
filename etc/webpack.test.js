
var path = require('path');

var helpers = require('../plugin/helpers');

module.exports = helpers.extendConfig(
  helpers.resolve('webpack.node.js'),
  {
    filename: __filename,
    output: {
      path: path.resolve(__dirname, '..', 'tmp', 'dist')
    },
    resolve: {
      alias: {
        'hops-main': path.resolve(__dirname, '..', 'tmp')
      }
    }
  }
);
