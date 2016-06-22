
var path = require('path');

var webpack = require('webpack');

var helpers = require('../config/helpers');

module.exports = helpers.extend(
 'webpack.base.js',
  {
    entry: require.resolve('../lib/shim'),
    cache: {},
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.resolve(helpers.root, 'dist'),
      noInfo: true,
      watchOptions: {
        aggregateTimeout: 100
      }
    },
    hops: {
      dll: path.resolve(helpers.tmp, 'watch', 'vendor.js')
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: helpers.root,
        manifest: require(path.resolve(helpers.tmp, 'watch', 'vendor.json'))
      })
    ],
    extend: helpers.extend.bind(null, __filename)
  }
);
