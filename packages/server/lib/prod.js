'use strict';

var path = require('path');

var express = require('express');
var mime = require('mime');
var helmet = require('helmet');

var hopsConfig = require('hops-config');

var common = require('./common');

module.exports = function () {
  var app = express();
  app.use(common.rewritePath);
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
  common.bootstrap(app);
  try {
    var middlewareFile = path.resolve(
      hopsConfig.buildDir,
      require(hopsConfig.nodeConfig).output.filename
    );
    require.resolve(middlewareFile);
    common.registerMiddleware(
      app.use(helmet.noCache()),
      require(middlewareFile)
    );
  } catch (error) {
    console.error(error.stack.toString());
  }
  common.teardown(app);
  common.run(app);
};
