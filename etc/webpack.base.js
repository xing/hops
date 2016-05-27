
var WebpackConfig = require('webpack-config');

var config = require('../lib/config');

var entry = {};
entry[config.bundleName] = config.bundleFile;

module.exports = new WebpackConfig().merge({
  entry: entry,
  output: {
    path: config.distDir,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: config.babelIgnore
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.((html)|(svg)|(jpeg))$/,
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
    alias: {
      'hops-main': require.resolve('./webpack.entry'),
      'hops-main-render': config.appRoot
    }
  }
});
