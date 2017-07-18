'use strict';

var startServer = require('../lib/server');

var build = require('./build');

module.exports = function runServe (program, callback) {
  build(program, function (error) {
    if (error) {
      callback ? callback(error) : console.error(error.stack.toString());
    } else {
      startServer(callback);
    }
  });
};
