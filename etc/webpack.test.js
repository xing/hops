
var helpers = require('../config/helpers');

module.exports = helpers.extend(
  'webpack.node.js',
  helpers.removeLoader.bind(null, 'babel'),
  {
    module: {
      preLoaders: [{
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: [/node_modules/, /.tmp/] 
      }, {
        test: /\.css$/,
        loader: 'stylelint',
        exclude: [/node_modules/, /.tmp/]
      }],
      loaders: [{
        test: /\.test\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules\//
      }, {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          cacheDirectory: false,
          plugins: (process.env.npm_config_coverage) ? ['__coverage__'] : []
        },
        exclude: [/\.test\.jsx?$/, /node_modules\//, /.tmp/]
      }]
    },
    extend: helpers.extend.bind(null, __filename)
  }
);
