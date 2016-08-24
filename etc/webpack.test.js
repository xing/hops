'use strict';

module.exports = require('./webpack.node.js')
.removeLoader('babel')
.merge({
  module: {
    loaders: [{
      test: /\.test\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
      },
      exclude: [/node_modules/, /.tmp/]
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: (process.env.npm_config_coverage) ? ['__coverage__'] : []
      },
      exclude: [/\.test\.jsx?$/, /node_modules/, /.tmp/]
    }]
  }
})
.expose();
