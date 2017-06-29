'use strict';

var fs = require('fs');
var path = require('path');

function getManifestData () {
  var hopsConfig = require('..');
  var filepath = path.resolve(hopsConfig.buildDir, 'manifest.json');
  if (fs.existsSync(filepath)) {
    return require(filepath);
  }
}

var manifest = '';
exports.getManifest = function () {
  var hopsConfig = require('..');
  if (!manifest) {
    var filepath = path.resolve(hopsConfig.buildDir, 'manifest.js');
    if (fs.existsSync(filepath)) {
      manifest = fs.readFileSync(filepath, 'utf8');
    }
  }
  return manifest;
};

var assets = { js: [], css: [] };
exports.getAssets = function () {
  if (!assets.js.length) {
    var manifestData = getManifestData();
    if (manifestData) {
      Object.keys(manifestData)
      .filter(function (key) {
        // eslint-disable-next-line no-useless-escape
        return /^(?!(.*\/)?chunk\-|(.*\/)?manifest).*\.(cs|j)s$/.test(key);
      })
      .sort(function (a, b) {
        switch (true) {
          case a === 'vendor.js': return -1;
          case b === 'vendor.js': return 1;
          case a < b: return -1;
          case a > b: return 1;
          default: return 0;
        }
      })
      .reduce(function (assets, key) {
        if (/\.js$/.test(key)) {
          assets.js.push(manifestData[key]);
        } else if (/\.css$/.test(key)) {
          assets.css.push(manifestData[key]);
        }
        return assets;
      }, assets);
    }
  }
  return assets;
};
