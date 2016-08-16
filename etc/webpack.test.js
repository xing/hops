
var helpers = require('../config/helpers');

module.exports = helpers.extend(
  'webpack.node.js',
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
        query: {
          cacheDirectory: false,
          plugins: (process.env.npm_config_coverage) ? ['__coverage__'] : []
        },
        exclude: [/\.test\.jsx?$/, /node_modules/, /.tmp/]
      }]
    }
  }
);
