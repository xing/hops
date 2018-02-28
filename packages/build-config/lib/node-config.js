/* eslint-disable */
var fs = require('fs');
var path = require('path');
var root = require('pkg-dir').sync();
var expand = path.join.bind(path, root);
/* config definition */
var manifest = '';
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
});
