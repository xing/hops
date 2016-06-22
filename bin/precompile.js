#!/usr/bin/env node

var path = require('path');

var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var helpers = require('../config/helpers');

function getConfig(prefix, overrides) {
  var defaults = {
    output: {
      path: path.resolve(helpers.tmp, prefix),
      filename: 'vendor.js',
      library: '__vendor__'
    },
    plugins: [
      new webpack.DllPlugin({
        context: helpers.root,
        path: path.resolve(helpers.tmp, prefix, 'vendor-manifest.json'),
        name: '__vendor__'
      }),
      new webpack.ProgressPlugin()
    ]
  };
  return helpers.extend('webpack.dll.js', helpers.merge(defaults, overrides));
}

if (path.resolve(__dirname, '..') !== helpers.root) {
  var configs = [
    getConfig('watch', {
      devtool: 'cheap-module-eval-source-map'
    }),
    getConfig('build', {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false, unused: true, 'dead_code': true }
        })
      ]
    })
  ];
  configs.forEach(function (config) {
    webpack(config).run(function(error) {
      // eslint-disable-next-line no-console
      if (error) { console.log(error); }
    });
  });
}
