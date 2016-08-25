/* eslint-disable no-underscore-dangle */
'use strict';

var path = require('path');

var appRoot = require('app-root-path');
var merge = require('webpack-merge');

var HopsPlugin = require('../plugin');

function Configuration(options, delta) {
  Object.assign(this, options || {}, { _raw: delta || options });
}

Configuration.prototype.expose = function () {
  return Object.assign({}, this, { _wrapped: this });
};

Configuration.prototype.merge = function (options) {
  return new Configuration(merge(this, options), options);
};

Configuration.prototype.modify = function (modify) {
  return new Configuration(modify(Object.assign({}, this)));
};

Configuration.prototype.removeLoader = function (name) {
  return new Configuration(Object.assign({}, this, {
    module: Object.assign({}, this.module, {
      loaders: this.module.loaders.filter(
        function (loader) {
          var json = JSON.stringify(loader);
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
      return (plugin.constructor !== (constructor));
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
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        cacheDirectory: path.resolve(appRoot.toString(), '.tmp', 'babel'),
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime']
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
      'hops-entry-point': appRoot.toString()
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HopsPlugin((function (config) {
      ['config', 'template'].forEach(function (key) {
        if (config[key]) {
          config[key] = appRoot.resolve(config[key]);
        }
      });
      return config;
    })(appRoot.require('package.json').hops || {}))
  ]
});
