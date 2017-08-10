'use strict';

var hopsConfig = require('..');

module.exports = function () {
  this.cacheable();
  return 'module.exports = ' + JSON.stringify(hopsConfig).replace(
    new RegExp(hopsConfig.appDir, 'g'), '.'
  );
};
