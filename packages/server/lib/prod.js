'use strict';

var path = require('path');

var express = require('express');
var mime = require('mime');
var helmet = require('helmet');

var hopsConfig = require('hops-config');

var common = require('./common');

module.exports = function () {
  var app = express();
  app.use(helmet({ noCache: false }));
  app.use(express.static(hopsConfig.buildDir, {
    maxAge: '1y',
    setHeaders: function (res, filepath) {
      if (mime.lookup(filepath) === 'text/html') {
        helmet.noCache()(null, res, function () {});
      }
    },
    redirect: false
  }));
  hopsConfig.bootstrap(app);
  app.use(common.rewritePath);
  try {
    var middlewareFile = path.resolve(
      hopsConfig.buildDir,
      require(hopsConfig.renderConfig).output.filename
    );
    require.resolve(middlewareFile);
    var middleware = require(middlewareFile);
    common.registerMiddleware(
      app.use(helmet.noCache()),
      middleware.__esModule ? middleware.default : middleware
    );
  } catch (error) {
    console.error(error.stack.toString());
  }
  hopsConfig.teardown(app);
  app.listen(hopsConfig.port, hopsConfig.host, function (error) {
    if (error) {
      console.error(error.stack.toString());
    } else {
      console.log('production server listening at ' + hopsConfig.address);
    }
  });
};
