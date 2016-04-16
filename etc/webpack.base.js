
var WebpackConfig = require('webpack-config');

var config = require('../lib/config');

var entry = {};
entry[config.bundleName] = config.bundleFile;
if (config.workerFile && config.isProd) {
  entry[config.workerName] = config.workerFile;
}

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
