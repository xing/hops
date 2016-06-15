
var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');
var merge = require('webpack-merge').smart;

function fileExists(filePath) {
  try { fs.accessSync(filePath, fs.F_OK); return true; }
  catch (e) { return false; }
}

module.exports = exports = {
  root: appRoot.toString(),
  resolve: function resolve(fileName) {
    var filePath = fileName;
    if (!path.isAbsolute(filePath) || !fileExists(filePath)) {
      filePath = appRoot.resolve(fileName);
      if (!fileExists(filePath)) {
        filePath = path.resolve(__dirname, '..', 'etc', fileName);
      }
    }
    return filePath;
  },
  extend: function (fileName, transform, config) {
    var base = require(exports.resolve(fileName));
    delete base.extend;
    return merge((config) ? transform(base) : base, config || transform);
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
    return Object.assign({}, config, {
      plugins: config.plugins.filter(function (plugin) {
        return (plugin.constructor !== constructor);
      })
    });
  }
};
