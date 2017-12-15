'use strict';

require('babel-polyfill');

var entryPoint = require('hops-entry-point');

if (entryPoint.__esModule) {
  module.exports = entryPoint.default;
} else {
  module.exports = entryPoint;
}
