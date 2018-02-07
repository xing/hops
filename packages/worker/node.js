'use strict';

var createDispatcher = require('./lib/events');

module.exports = createDispatcher(function() {
  // no-op
});

module.exports.emit = function() {
  // no-op
};
