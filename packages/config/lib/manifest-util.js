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

var manifestScript = null;

exports.getManifestScript = function () {
  var hopsConfig = require('..');
  if (!manifestScript) {
    var filepath = path.resolve(hopsConfig.buildDir, 'manifest.js');
    if (fs.existsSync(filepath)) {
      manifestScript = fs.readFileSync(filepath, 'utf8');
    }
  }
  return manifestScript || '';
};

var assetURLs = null;

exports.getAssetURLs = function () {
  var vjs = 'vendor.js';
  var defaults = { js: [], css: [] };
  if (!assetURLs) {
    var manifest = getManifestData();
    if (manifest) {
      assetURLs = Object.keys(manifest).sort(function (a, b) {
        return a === vjs ? -1 : b === vjs ? 1 : a < b ? -1 : a > b ? 1 : 0;
      }).reduce(function (assets, key) {
        if (!/^(?:chunk.*|manifest)\.js/.test(key)) {
          if (/\.js$/.test(key)) {
            assets.js.push(manifest[key]);
          }
          if (/\.css$/.test(key)) {
            assets.css.push(manifest[key]);
          }
        }
        return assets;
      }, defaults);
    }
  }
  return assetURLs || defaults;
};
