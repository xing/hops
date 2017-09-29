'use strict';

var hopsBuild = require('hops-build');
var hopsExpress = require('hops-express');

function runServe (program, callback) {
  hopsBuild.runBuild(program, function (error) {
    if (error) {
      callback ? callback(error) : console.error(error.stack.toString());
    } else {
      hopsExpress.startServer(callback);
    }
  });
}

module.exports = {
  runBuild: function callRunBuild () {
    return hopsBuild.runBuild.apply(null, arguments);
  },
  runDevelop: function callRunDevelop () {
    return hopsBuild.runServer.apply(null, arguments);
  },
  runServe: function callRunServe () {
    return runServe.apply(null, arguments);
  },
  startServer: function callStartServer () {
    return hopsExpress.startServer.apply(null, arguments);
  }
};
