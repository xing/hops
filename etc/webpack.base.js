/* eslint-disable no-underscore-dangle */
'use strict';

var path = require('path');

var appRoot = require('app-root-path');

var webpack = require('webpack');
var merge = require('webpack-merge');

function Configuration(options, delta) {
  Object.assign(this, options || {}, { _raw: delta || options });
}

Configuration.prototype.merge = function (options) {
  return new Configuration(merge(this, options), options);
};

Configuration.prototype.modify = function (modify) {
  return new Configuration(modify(Object.assign({}, this)));
};

Configuration.prototype.clean = function () {
  var config = Object.assign({}, this);
  delete config._raw;
  return config;
};

Configuration.prototype.removeLoader = function (name) {
  return new Configuration(Object.assign({}, this, {
    module: Object.assign({}, this.module, {
      rules: this.module.rules.filter(
        function (rule) {
          var json = JSON.stringify(rule);
          var regexp = new RegExp('"' + name + '(-loader)?(\\?|")');
          return (json.search(regexp) === -1);
        }
      )
    })
  }));
};

Configuration.prototype.removePlugin = function (constructor) {
  return new Configuration(Object.assign({}, this, {
    plugins: this.plugins.filter(function (plugin) {
      return (String(plugin.constructor) !== String(constructor));
    })
  }));
};

module.exports = new Configuration({
  context: appRoot.toString(),
  entry: 'hops-entry-point',
  output: {
    path: path.resolve(appRoot.toString(), 'dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: 'chunk-[id].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel',
        options: {
          cacheDirectory: path.resolve(appRoot.toString(), '.tmp', 'babel'),
          presets: ['es2015', 'stage-0', 'react']
        }
      }],
      exclude: /node_modules\//
    }, {
      test: /\.json$/,
      use: {
        loader: 'json'
      }
    }, {
      test: /\.css$/,
      use: [
        'style',
        {
          loader: 'css',
          options: {
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
      use: {
        loader: 'file'
      }
    }, {
      test: /\.((png)|(gif))$/,
      use: {
        loader: 'url',
        options: {
          limit: 10000
        }
      }
    }]
  },
  resolve: {
    alias: {
      'hops-entry-point': appRoot.toString()
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      options: {
        postcss: {
          plugins: [require('postcss-cssnext')]
        },
        context: __dirname
      }
    })
  ]
});
