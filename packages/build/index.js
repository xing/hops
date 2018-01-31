'use strict';

module.exports = {
  runBuild: function() {
    return require('./lib/build').apply(null, arguments);
  },
  runServer: function() {
    return require('./lib/server').apply(null, arguments);
  },
  createRenderer: function() {
    return require('./lib/renderer').apply(null, arguments);
  },
  createMiddleware: function() {
    return require('./lib/middleware').apply(null, arguments);
  },
  createTranspiler: function() {
    return require('./lib/transpiler').apply(null, arguments);
  },
};
