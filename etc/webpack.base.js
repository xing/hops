
var WebpackConfig = require('webpack-config');

var config = require('../lib/config');

module.exports = new WebpackConfig().merge({
  entry: [
    'normalize.css',
    config.appRoot
  ],
  output: {
    path: config.distDir,
    publicPath: '/',
    filename: config.jsFile
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel', exclude: config.noBabel
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.((html)|(jpeg))$/,
      loader: 'file'
    }, {
      test: /\.((png)|(gif))$/,
      loader: 'url?limit=100000'
    }]
  },
  postcss: [
    require('postcss-cssnext')
  ],
  resolve: {
    packageMains: ['webpack', 'browser', 'web', 'browserify', 'style', 'main']
  }
});
