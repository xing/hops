'use strict';

var template = require('lodash.template');

module.exports = function (source) {
  this.cacheable();
  return 'module.exports = ' + template(source);
};
