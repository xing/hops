'use strict';

var fs = require('fs');
var path = require('path');

var manifest = '';
exports.getManifest = function () {
  var hopsConfig = require('..');
  if (!manifest) {
    var filepath = path.resolve(hopsConfig.cacheDir, 'manifest.js');
    if (fs.existsSync(filepath)) {
      manifest = fs.readFileSync(filepath, 'utf8');
    }
  }
  return manifest;
};

var assets = { js: [], css: [] };
exports.getAssets = function () {
  var hopsConfig = require('..');
  if (!assets.js.length) {
    var filepath = path.resolve(hopsConfig.cacheDir, 'manifest.json');
    if (fs.existsSync(filepath)) {
      assets = require(filepath);
    }
  }
  return assets;
};
