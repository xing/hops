'use strict';

var createDispatcher = require('./lib/events');

module.exports = createDispatcher(function(emit) {
  // proxy postmessage from app...
});

module.exports.emit = function() {
  // proxy postmessage to app...
};

// eslint-disable-next-line no-undef
module.exports.assets = HOPS_ASSETS;
