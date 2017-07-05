'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var mime = require('mime');
var helmet = require('helmet');

var hopsConfig = require('hops-config');

var common = require('./common');

module.exports = function () {
  var app = express();
  app.use(common.rewritePath);
  app.use(helmet());
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
  var middlewareFile = path.join(
    hopsConfig.buildDir,
    require(hopsConfig.nodeConfig).output.filename
  );
  if (fs.existsSync(middlewareFile)) {
    common.registerMiddleware(
      app.use(helmet.noCache()),
      require(middlewareFile)
    );
  }
  common.teardown(app);
  common.run(app);
};
