'use strict';

var path = require('path');

var merge = require('webpack-merge');

function Configuration(options) {
  Object.assign(this, options || {}, {
    tmpPath: appRoot.resolve('.tmp/webpack')
  });
}

Configuration.prototype.merge = function (options) {
  return new Configuration(merge.smart(this, options));
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
      return (plugin.constructor !== (constructor || require('../plugin')));
    })
  }));
};

Configuration.prototype.applyMaltConfig = function (filename) {
  try {
    return this.merge(require(path.join(
      require.resolve('malt-config'),
      path.basename(filename)
    )));
  } catch (e) {
    return this;
  }
};

module.exports = Configuration;
