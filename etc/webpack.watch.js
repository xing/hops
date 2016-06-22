
var path = require('path');
var util = require('util');

var webpack = require('webpack');

var helpers = require('../config/helpers');

var pkg = require('../package.json');

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
      dll: [{
        path: util.format('hops-%s.js', pkg.version),
        source: path.resolve(helpers.tmp, 'watch', 'hops.js')
      }]
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: helpers.root,
        manifest: require(path.resolve(helpers.tmp, 'watch', 'hops.json'))
      })
    ],
    extend: helpers.extend.bind(null, __filename)
  }
);
