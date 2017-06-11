'use strict';

var express = require('express');

var hopsRoot = require('hops-root');
var hopsConfig = require('hops-config');

var build = require('./build');
var util = require('./util');

module.exports = function runServe (port) {
  build(function (error, stats) {
    if (error) {
      util.logError(error.stack.toString());
    } else {
      var app = express();
      var middleware = hopsRoot.require(hopsConfig.buildDir, 'server.js');
      app.use(express.static(hopsConfig.buildDir));
      app.use(middleware.__esModule ? middleware.default : middleware);
      app.listen(port || 8080, function () {
        util.logInfo('production server listening');
      });
    }
  });
};
