'use strict';

var fs = require('fs');
var path = require('path');

var hopsConfig = require('.');

var manifestData = null;
var manifestScript = '';

function getRawManifestData () {
  if (!manifestData) {
    var filepath = path.resolve(
      hopsConfig.buildDir,
      'manifest.json'
    );
    if (fs.existsSync(filepath)) {
      manifestData = require(filepath);
    }
  }
  return manifestData || {};
}

exports.getManifestScript = function () {
  if (!manifestScript) {
    var filepath = path.resolve(
      hopsConfig.buildDir,
      'manifest.js'
    );
    if (fs.existsSync(filepath)) {
      manifestScript = fs.readFileSync(filepath, 'utf8');
    }
  }
  return manifestScript;
};

exports.getAssetLinks = function () {
  var vjs = 'vendor.js';
  var manifest = getRawManifestData() || {};
  return Object.keys(manifest).sort(function (a, b) {
    return a === vjs ? -1 : b === vjs ? 1 : a < b ? -1 : a > b ? 1 : 0;
  }).reduce(function (assets, key) {
    if (!/^(chunk|manifest).*\.js/.test(key)) {
      if (/\.js$/.test(key)) {
        assets.js.push(manifest[key]);
      }
      if (/\.css$/.test(key)) {
        assets.css.push(manifest[key]);
      }
    }
    return assets;
  }, { js: [], css: [] });
};
