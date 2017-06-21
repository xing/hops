'use strict';

require('babel-polyfill');

var entryPoint = require('hops-entry-point');
if (entryPoint.__esModule) {
  entryPoint = entryPoint.default;
}
entryPoint();
