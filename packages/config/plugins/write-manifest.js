'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var hopsConfig = require('..');

module.exports = function Plugin (regExp) {
  mkdirp.sync(hopsConfig.cacheDir);
  this.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      var paths = Object.keys(compilation.assets);
      var assets = paths.reduce(function (assets, path) {
        if (path.indexOf('hot-update') >= 0 || path.indexOf('chunk-') >= 0) {
          return assets;
        }
        if (path.indexOf('.css') === path.length - 4) {
          assets.css.push('/' + path);
        }
        if (path.indexOf('.js') === path.length - 3) {
          if (path.indexOf('vendor-') >= 0) {
            assets.js.unshift('/' + path);
          } else {
            assets.js.push('/' + path);
          }
        }
        return assets;
      }, { css: [], js: [] });
      var fileName = path.resolve(hopsConfig.cacheDir, 'manifest.json');
      var fileContent = JSON.stringify(assets, null, '  ');
      fs.writeFile(fileName, fileContent, callback);
    });
  };
};
