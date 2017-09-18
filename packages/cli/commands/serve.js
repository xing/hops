'use strict';

var startServer = require('../lib/server');

var runBuild = require('../').runBuild;

module.exports = function runServe (program, callback) {
  runBuild(program, function (error) {
    if (error) {
      callback ? callback(error) : console.error(error.stack.toString());
    } else {
      startServer(callback);
    }
  });
};
