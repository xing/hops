var fs = require('fs');

var appRoot = require('app-root-path');
var merge = require('webpack-merge').smart;

/** @ignore */
function fileExists(filePath) {
  try { fs.accessSync(filePath, fs.F_OK); return true; }
  catch (e) { return false; }
}

module.exports = exports = {
  merge: merge,
  root: appRoot.toString(),
  tmp: appRoot.resolve('.tmp/webpack'),
  extend: function (/* fileName, ...transform, overrides */) {
    var args = Array.from(arguments);
    var fileName = args.shift();
    var overrides = args.pop();
    var defaults = args.reduce(
      function (config, transform) {
        return transform(config);
      },
      require(fileName)
    );
    return merge(defaults, overrides);
  },
  removeLoader: function (name, config) {
    return Object.assign({}, config, {
      module: Object.assign({}, config.module, {
        loaders: config.module.loaders.filter(
          function (loader) {
            var json = JSON.stringify(loader);
            var regexp = new RegExp('"' + name + '(-loader)?(\\?|")');
            return (json.search(regexp) === -1);
          }
        )
      })
    });
  },
  removePlugin: function (constructor, config) {
    constructor = constructor || require('../plugin');
    var result = Object.assign({}, config, {
      plugins: config.plugins.filter(function (plugin) {
        return (plugin.constructor !== constructor);
      })
    });
    return result;
  },
  getConfig: function () {
    var config = Object.assign({}, appRoot.require('package.json').hops);
    ['config', 'template'].forEach(function (key) {
      if (config[key] && !fileExists[config[key]]) {
        config[key] = appRoot.resolve(config[key]);
      }
    });
    return config;
  }
};
