var path = require('path');

var webpack = require('webpack');

var helpers = require('../config/helpers');

module.exports = helpers.extend(
  'webpack.base.js',
  helpers.removePlugin.bind(null, null),
  helpers.removePlugin.bind(null, webpack.DllReferencePlugin),
  {
    entry: ['hops'],
    output: {
      path: helpers.tmp,
      filename: 'dll.hops.js',
      libraryTarget: 'commonjs2'
    },
    devtool: 'cheap-module-eval-source-map',
    progress: true,
    plugins: [
      new webpack.DllPlugin({
        path: path.resolve(helpers.tmp, 'hops-manifest.json')
      })
    ]
  }
);
