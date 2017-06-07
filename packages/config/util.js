'use strict';

var fs = require('fs');
var hopsRoot = require('hops-root');
var hopsConfig = require('.');

var manifestData = null;
var manifestScript = '';

function getRawManifestData () {
  if (!manifestData) {
    manifestData = hopsRoot.require(
      hopsConfig.buildDir,
      'manifest.json'
    );
  }
  return Object.assign({}, manifestData);
}

exports.getManifestScript = function () {
  if (!manifestScript) {
    var filename = getRawManifestData()['manifest.js'];
    if (filename) {
      var filepath = hopsRoot.resolve(
        hopsConfig.buildDir,
        filename.replace(/^\/*/, '')
      );
      if (fs.existsSync(filepath)) {
        manifestScript = fs.readFileSync(filepath, 'utf8');
      }
    }
  }
  return manifestScript;
};

exports.getAssetLinks = function () {
  var vjs = 'vendor.js';
  var manifest = getRawManifestData();
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
