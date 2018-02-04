'use strict';

module.exports = {
  init: function() {
    return require('./lib/init').apply(null, arguments);
  },
  run: function() {
    return require('./lib/run').apply(null, arguments);
  },
};
