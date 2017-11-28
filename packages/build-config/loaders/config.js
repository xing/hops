'use strict';

var hopsConfig = require('hops-config');

function removeAbsolutePaths(config) {
  return Object.keys(config).reduce(function(browserConfig, key) {
    if (!/(config|file|dir)s?$/i.test(key)) {
      browserConfig[key] = config[key];
    }

    return browserConfig;
  }, {});
}

module.exports = function() {
  this.cacheable();
  return 'module.exports = ' + JSON.stringify(removeAbsolutePaths(hopsConfig));
};
