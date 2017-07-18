'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var mime = require('mime');
var helmet = require('helmet');

var hopsConfig = require('hops-config');
var webpackConfig = require(hopsConfig.nodeConfig);

var common = require('./common');

module.exports = function startServer (callback) {
  var app = express();
  app.use(helmet());
  app.use(common.rewritePath);
  app.use(express.static(hopsConfig.buildDir, {
    maxAge: '1y',
    setHeaders: function (res, filepath) {
      if (mime.lookup(filepath) === 'text/html') {
        helmet.noCache()(null, res, function () {});
      }
    },
    redirect: false
  }));
  common.bootstrap(app, hopsConfig);
  var filePath = path.join(
    webpackConfig.output.path,
    webpackConfig.output.filename
  );
  if (fs.existsSync(filePath)) {
    common.registerMiddleware(
      app.use(helmet.noCache()),
      require(filePath)
    );
  }
  common.teardown(app, hopsConfig);
  common.run(app, callback);
};
