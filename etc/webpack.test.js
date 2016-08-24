'use strict';

module.exports = require('./webpack.node.js')
.removeLoader('babel')
.merge({
  module: {
    loaders: [{
      test: /\.test\.jsx?$/,
      loader: 'babel',
      exclude: [/node_modules/, /.tmp/]
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      query: Object.assign(
        {
          cacheDirectory: false,
          plugins: (process.env.npm_config_coverage) ? ['__coverage__'] : []
        },
        require('./babel.json')
      ),
      exclude: [/\.test\.jsx?$/, /node_modules/, /.tmp/]
    }]
  }
})
.expose();
