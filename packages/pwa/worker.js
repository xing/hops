'use strict';

var hopsConfig = require('hops-config');

module.exports = function(assets) {
  console.log('hello from worker', assets, hopsConfig);
};
