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
      var assets = paths.reduce(function (assets, assetPath) {
        if (
          assetPath.indexOf('hot-update') >= 0 ||
          assetPath.indexOf('chunk-') >= 0
        ) {
          return assets;
        }
        if (path.extname(assetPath) === '.css') {
          assets.css.push('/' + assetPath);
        }
        if (path.extname(assetPath) === '.js') {
          if (assetPath.indexOf('vendor-') >= 0) {
            assets.js.unshift('/' + assetPath);
          } else {
            assets.js.push('/' + assetPath);
          }
        }
        return assets;
      }, { css: [], js: [] });
      var fileName = path.resolve(hopsConfig.cacheDir, 'manifest.json');
      var fileContent = JSON.stringify(assets, null, 2);
      fs.writeFile(fileName, fileContent, callback);
    });
  };
};
