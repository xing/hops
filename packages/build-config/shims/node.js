'use strict';

require('babel-polyfill');

var hopsConfig = require('hops-config');
var entryPoint = require('hops-entry-point');

process.chdir(hopsConfig.appDir);

if (entryPoint.__esModule) {
  module.exports = entryPoint.default;
} else {
  module.exports = entryPoint;
}
