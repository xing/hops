
var path = require('path');
var WebpackConfig = require('webpack-config').default;

var config = require('../lib/config');
var HopsPlugin = require('../plugin');

module.exports = new WebpackConfig().merge({
  filename: __filename,
  entry: require.resolve('../shims/browser'),
  output: {
    path: path.resolve(config.appRoot, 'dist'),
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: 'chunk-[id]-[hash].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules\//
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        {
          loader: 'css',
          query: {
            sourceMap: true,
            modules: true,
            localIdentName: '[name]-[local]-[hash:base64:5]',
            importLoaders: 1
          }
        },
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
    extensions: ['', '.js', '.jsx'],
    alias: {
      'hops-main': config.appRoot
    }
  },
  plugins: [
    new HopsPlugin({
      config: config.webpackNode
    })
  ]
});
