'use strict';

module.exports = require('./webpack.node.js')
.removeLoader('babel')
.merge({
  module: {
    rules: [{
      test: /\.test\.jsx?$/,
      use: {
        loader: 'babel',
        options: {
          presets: ['es2015', 'stage-0', 'react'],
        }
      },
      exclude: [/node_modules/, /.tmp/]
    }, {
      test: /\.jsx?$/,
      use: {
        loader: 'babel',
        options: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: (process.env.npm_config_coverage) ? ['__coverage__'] : []
        }
      },
      exclude: [/\.test\.jsx?$/, /node_modules/, /.tmp/]
    }]
  }
});
