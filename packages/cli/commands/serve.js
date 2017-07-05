'use strict';

var startServer = require('../lib/server');

var build = require('./build');

module.exports = function runServe (program) {
  build(program, function (error) {
    if (error) {
      console.error(error.stack.toString());
    } else {
      startServer();
    }
  });
};
