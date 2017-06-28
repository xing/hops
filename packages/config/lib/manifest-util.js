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
  var defaults = { js: [], css: [] };
  if (!assetURLs) {
    var manifest = getManifestData();
    if (manifest) {
      assetURLs = Object.keys(manifest)
      .filter(function (key) {
        // eslint-disable-next-line no-useless-escape
        return !/(chunk\-.+|manifest)\.js$/.test(key);
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
          assets.js.push(manifest[key]);
        } else if (/\.css$/.test(key)) {
          assets.css.push(manifest[key]);
        }
        return assets;
      }, defaults);
    }
  }
  return assetURLs || defaults;
};
