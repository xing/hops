'use strict';

var loaderUtils = require('loader-utils');

var hopsConfig = require('hops-config');

function getConfig() {
  return (
    'module.exports = ' +
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
    )
  );
}

function getNodeConfig() {
  return [
    'var path = require("path");',
    'var expand = path.join.bind(path, process.cwd());',
    getConfig().replace(/(config|file|dir)":"(\.[^"]+)"/gi, '$1":expand("$2")'),
  ].join('');
}

module.exports = function() {
  this.cacheable();
  var options = loaderUtils.getOptions(this);
  return options && options.target === 'node' ? getNodeConfig() : getConfig();
};
