'use strict';

module.exports = {
  get runBuild() {
    return require('./lib/build');
  },
  get runServer() {
    return require('./lib/server');
  },
  get createRenderer() {
    return require('./lib/renderer');
  },
  get createMiddleware() {
    return require('./lib/middleware');
  },
  get createTranspiler() {
    return require('./lib/transpiler');
  },
};
