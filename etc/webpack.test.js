'use strict';

var helpers = require('./helpers');

module.exports = helpers.extend(
  './webpack.node.js',
  helpers.removeLoader.bind(null, 'babel'),
  {
    module: {
      loaders: [{
        test: /\.test\.jsx?$/,
        loader: 'babel',
        exclude: [/node_modules/, /.tmp/]
      }, {
        test: /\.jsx?$/,
        loader: 'babel',
        query: helpers.merge(
          {
            cacheDirectory: false,
            plugins: (process.env.npm_config_coverage) ? ['__coverage__'] : []
          },
          require('./babel.json')
        ),
        exclude: [/\.test\.jsx?$/, /node_modules/, /.tmp/]
      }]
    }
  }
);
