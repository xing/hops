'use strict';

var loaderUtils = require('loader-utils');

var hopsConfig = require('hops-config');

function getConfig() {
  return [
    'module.exports = ',
    JSON.stringify(
      Object.assign(
        {},
        hopsConfig,
        Object.keys(hopsConfig)
          .filter(function(key) {
            return /(config|file|dir)s?$/i.test(key);
          })
          .reduce(function(result, key) {
            result[key] = (function shorten(item) {
              if (typeof item === 'string') {
                return item.replace(new RegExp(hopsConfig.appDir), '.');
              } else if (Array.isArray(item)) {
                return item.map(shorten);
              } else {
                return item;
              }
            })(hopsConfig[key]);
            return result;
          }, {})
      )
    ),
    ';',
  ].join('');
}

function getNodeConfig() {
  return [
    'var fs = require("fs");',
    'var path = require("path");',
    'var root = require("pkg-dir").sync(process.cwd());',
    'var expand = path.join.bind(path, root);',
    getConfig()
      .replace(/(config|file|dir)s?":"(\.[^"]*)"/gi, '$1":expand("$2")')
      .replace(/((?:config|file|dir)s?":)\[([^\]]+)\]/gi, function() {
        return (
          arguments[1] +
          '[' +
          arguments[2]
            .split(',')
            .map(function(p) {
              return 'expand(' + p + ')';
            })
            .join(',') +
          ']'
        );
      }),
    'var manifest = "";',
    'var assets = { js: [], css: [] };',
    'Object.defineProperties(module.exports, {',
    '  manifest: {',
    '    enumerable: true,',
    '    get: function() {',
    '      if (!manifest) {',
    '        var fp = path.resolve(module.exports.cacheDir, "manifest.js");',
    '        if (fs.existsSync(fp)) {',
    '          manifest = fs.readFileSync(fp, "utf8");',
    '        }',
    '      }',
    '      return manifest;',
    '    },',
    '  },',
    '  assets: {',
    '    enumerable: true,',
    '    get: function() {',
    '      if (!assets.js.length) {',
    '        var fp = path.resolve(module.exports.cacheDir, "manifest.json");',
    '        if (fs.existsSync(fp)) {',
    '          assets = JSON.parse(fs.readFileSync(fp, "utf8"));',
    '        }',
    '      }',
    '      return assets;',
    '    },',
    '  },',
    '});',
  ].join('');
}

module.exports = function() {
  this.cacheable();
  var options = loaderUtils.getOptions(this);
  return options && options.target === 'node' ? getNodeConfig() : getConfig();
};
