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
      var filepath = hopsRoot.resolve(hopsConfig.buildDir, filename);
      if (fs.existsSync(filepath)) {
        manifestScript = fs.readFileSync(filepath, 'utf8');
      }
    }
  }
  return manifestScript;
};

exports.getManifestData = function () {
  var manifest = getRawManifestData();
  var keys = Object.keys(manifest).sort(function (a, b) {
    if (a === 'vendor.js') { return -1; }
    if (b === 'vendor.js') { return 1; }
    return a < b ? -1 : a > b ? 1 : 0;
  });
  var assets = { js: [], css: [] };
  return keys.reduce(function (result, key) {
    if (!/^(chunk|manifest).*\.js/.test(key)) {
      if (/\.js$/.test(key)) {
        result.js.push(manifest[key]);
      }
      if (/\.css$/.test(key)) {
        result.css.push(manifest[key]);
      }
    }
    return result;
  }, assets);
};
