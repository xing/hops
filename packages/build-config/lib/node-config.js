/* eslint-disable */
var fs = require('fs');
var path = require('path');
var root = require('pkg-dir').sync(process.cwd());
var expand = path.join.bind(path, root);
/* config definition */
var manifest = '';
var assets = { js: [], css: [] };
Object.defineProperties(module.exports, {
  manifest: {
    enumerable: true,
    get: function() {
      if (!manifest) {
        var fp = path.resolve(module.exports.cacheDir, 'manifest.js');
        if (fs.existsSync(fp)) {
          manifest = fs.readFileSync(fp, 'utf8');
        }
      }
      return manifest;
    },
  },
  assets: {
    enumerable: true,
    get: function() {
      if (!assets.js.length) {
        var fp = path.resolve(module.exports.cacheDir, 'manifest.json');
        if (fs.existsSync(fp)) {
          assets = JSON.parse(fs.readFileSync(fp, 'utf8'));
        }
      }
      return assets;
    },
  },
});
