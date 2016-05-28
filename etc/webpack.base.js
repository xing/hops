
var WebpackConfig = require('webpack-config');

var config = require('../lib/config');
var HopsPlugin = require('./plugin.webpack');

module.exports = new WebpackConfig().merge({
  entry: require.resolve('./shim.webpack'),
  output: {
    path: config.distDir,
    publicPath: '/',
    filename: 'bundle.js'
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
      test: /\.css$/,
      loaders: [
        'style',
        'css?sourceMap&modules&localIdentName=' + config.cssName + '&importLoaders=1',
        'postcss'
      ]
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
      'hops-main': config.appRoot
    }
  },
  plugins: [
    new HopsPlugin({
      entry: require.resolve('./shim.node'),
      locations: config.shells
    })
  ]
});
