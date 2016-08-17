
var path = require('path');

var HopsPlugin = require('../plugin');
var helpers = require('../config/helpers');

module.exports = {
  context: helpers.root,
  entry: 'hops-entry-point',
  output: {
    path: path.resolve(helpers.root, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: 'chunk-[id].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        cacheDirectory: path.resolve(helpers.root, '.tmp', 'babel')
      },
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
            localIdentName: '[folder]-[name]-[local]-[hash:base64:5]',
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
  postcss: function () {
    return [
      require('postcss-cssnext')({
        browsers: '> 1%, last 2 versions'
      })
    ];
  },
  resolve: {
    alias: {
      'hops-entry-point': helpers.root
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [ new HopsPlugin(helpers.getConfig()) ],
  extend: helpers.extend.bind(null, __filename)
};
