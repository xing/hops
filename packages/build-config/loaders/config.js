'use strict';

var loaderUtils = require('loader-utils');

var hopsConfig = require('hops-config');

function getConfig(config) {
  return [
    'module.exports = ',
    JSON.stringify(
      Object.assign(
        {},
        config,
        Object.keys(config)
          .filter(function(key) {
            return /(config|file|dir)s?$/i.test(key);
          })
          .reduce(function(result, key) {
            result[key] = (function shorten(item) {
              if (typeof item === 'string') {
                return item.replace(new RegExp(config.appDir), '.');
              } else if (Array.isArray(item)) {
                return item.map(shorten);
              } else {
                return item;
              }
            })(config[key]);
            return result;
          }, {})
      )
    ),
    ';',
  ].join('');
}

function getNodeConfig() {
  return [
    'var path = require("path");',
    'var root = require("pkg-dir").sync();',
    'var expand = path.join.bind(path, root);',
    getConfig(hopsConfig)
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
  ].join('');
}

function getBrowserConfig() {
  return getConfig(
    Object.keys(hopsConfig).reduce(function(result, key) {
      if (key.indexOf('_') !== 0) {
        result[key] = hopsConfig[key];
      }
      return result;
    }, {})
  );
}

module.exports = function() {
  this.cacheable();
  var options = loaderUtils.getOptions(this);
  return options && options.target === 'node'
    ? getNodeConfig()
    : getBrowserConfig();
};
