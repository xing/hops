'use strict';

var hopsConfig = require('hops-config');

module.exports = function () {
  this.cacheable();
  return 'module.exports = ' + JSON.stringify(hopsConfig).replace(
    new RegExp(hopsConfig.appDir, 'g'), '.'
  );
};
