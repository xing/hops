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
        var vjs = 'vendor.js';
        return a === vjs ? -1 : b === vjs ? 1 : a < b ? -1 : a > b ? 1 : 0;
      })
      .reduce(function (assets, key) {
        assets[key.match(/\.(css|js)$/)[1]].push(manifestData[key]);
        return assets;
      }, assets);
    }
  }
  return assets;
};
