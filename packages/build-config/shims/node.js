'use strict';

require('babel-polyfill');

var entryPoint = require('hops-entry-point');

if (
  typeof entryPoint !== 'function' &&
  typeof entryPoint.default === 'function'
) {
  module.exports = entryPoint.default;
} else {
  module.exports = entryPoint;
}
