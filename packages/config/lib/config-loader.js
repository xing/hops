'use strict';

var hopsConfig = require('..');

module.exports = function () {
  var config = Object.keys(hopsConfig).reduce(function (result, key) {
    if (!/(?:config|script|file|dir)s?$/i.test(key)) {
      result[key] = hopsConfig[key];
    }
    return result;
  }, {});
  this.cacheable();
  return 'module.exports = ' + JSON.stringify(config);
};
