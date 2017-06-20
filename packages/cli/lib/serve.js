'use strict';

var startServer = require('hops-server').startProdServer;

var build = require('./build');

module.exports = function runServe () {
  build(function (error) {
    if (error) {
      console.error(error.stack.toString());
    } else {
      startServer();
    }
  });
};
