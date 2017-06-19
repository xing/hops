'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var helmet = require('helmet');

var hopsConfig = require('hops-config');

var build = require('./build');
var util = require('./util');
var serverConfig = require('hops-config/lib/server-config');

module.exports = function runServe () {
  build(function (error) {
    if (error) {
      util.logError(error.stack.toString());
    } else {
      var middlewareFile = path.resolve(hopsConfig.buildDir, 'server.js');
      var app = express();
      app.use(helmet({ noCache: false }));
      app.use(serverConfig.rewritePath);
      app.use(express.static(hopsConfig.buildDir, {
        maxAge: '365d',
        redirect: false
      }));
      if (fs.existsSync(middlewareFile)) {
        var middleware = require(middlewareFile);
        serverConfig.registerMiddleware(
          app.use(helmet.noCache()),
          middleware.__esModule ? middleware.default : middleware
        );
      }
      app.listen(hopsConfig.port, hopsConfig.host, function () {
        util.logInfo('production server listening at ' + hopsConfig.address);
      });
    }
  });
};
