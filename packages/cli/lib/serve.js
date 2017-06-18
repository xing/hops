'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');

var hopsConfig = require('hops-config');

var build = require('./build');
var util = require('./util');

module.exports = function runServe () {
  build(function (error) {
    if (error) {
      util.logError(error.stack.toString());
    } else {
      var app = express().use(express.static(hopsConfig.buildDir));
      var middlewareFile = path.resolve(hopsConfig.buildDir, 'server.js');
      if (fs.existsSync(middlewareFile)) {
        var middleware = require(middlewareFile);
        app.use(middleware.__esModule ? middleware.default : middleware);
      }
      app.listen(hopsConfig.port, hopsConfig.host, function () {
        util.logInfo('production server listening at ' + hopsConfig.address);
      });
    }
  });
};
