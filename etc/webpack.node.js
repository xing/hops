'use strict';

module.exports = require('./webpack.base.js')
.removeLoader('css')
.modify(function (config) {
  delete config.resolve.mainFields;
  config.resolve.aliasFields = [];
  return config;
})
.merge({
  target: 'node',
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: 'css-loader/locals',
          options: {
            sourceMap: false,
            modules: true,
            localIdentName: '[folder]-[name]-[local]-[hash:base64:5]'
          }
        }
      ]
    }]
  },
  devtool: '#inline-source-map',
  externals: [require('webpack-node-externals')()],
  resolve: {
    mainFields: ['main']
  }
});
