#!/usr/bin/env node

var path = require('path');

var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var helpers = require('../config/helpers');

function getConfig(infix, overrides) {
  var defaults = {
    output: {
      path: helpers.tmp,
      filename: 'vendor' + infix + 'js',
      library: '__vendor__'
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.resolve(helpers.tmp, 'vendor-manifest' + infix + 'json'),
        name: '__vendor__'
      })
    ]
  };
  return helpers.extend('webpack.dll.js', helpers.merge(defaults, overrides));
}

if (path.resolve(__dirname, '..') !== helpers.root) {
  var configs = [
    getConfig('.', {
      devtool: 'cheap-module-eval-source-map'
    }),
    getConfig('.min.', {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })
      ]
    }),
    getConfig('.node.', {
      target: 'node',
      externals: [nodeExternals()],
      devtool: 'cheap-module-eval-source-map'
    })
  ];
  configs.forEach(function (config) {
    /* eslint-disable no-console */
    console.log('precompiling ' + config.output.filename);
    webpack(config).run(function(error) {
      if (error) { console.log(error); }
    });
    /* eslint-enable no-console */
  });
}
