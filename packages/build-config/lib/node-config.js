/* eslint-disable */
var fs = require('fs');
var path = require('path');
var root = require('pkg-dir').sync();
var expand = path.join.bind(path, root);
/* config definition */
var assets = { js: [], css: [] };
Object.defineProperties(module.exports, {
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
