var fs = require('fs');
var path = require('path');

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
  resolve: function resolve(fileName) {
    var filePath = fileName;
    if (!path.isAbsolute(filePath) || !fileExists(filePath)) {
      filePath = appRoot.resolve(fileName);
      if (!fileExists(filePath)) {
        try { filePath = require.resolve('malt/' + fileName); }
        catch (e) { filePath = null; }
      }
      if (!fileExists(filePath)) {
        filePath = path.resolve(__dirname, '..', 'etc', fileName);
      }
    }
    return filePath;
  },
  extend: function (/* fileName, ...transform, overrides */) {
    var args = Array.from(arguments);
    var fileName = args.shift();
    var overrides = args.pop();
    var defaults = args.reduce(
      function (config, transform) {
        return transform(config);
      },
      require(exports.resolve(fileName))
    );
    delete defaults.extend;
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
  }
};
