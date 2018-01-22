'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var mime = require('mime');
var helmet = require('helmet');

var hopsConfig = require('hops-config');
var utils = require('./utils');

function createApp(options) {
  var app = express();
  app.use(helmet());
  app.use(utils.rewritePath);
  app.use(
    express.static(hopsConfig.buildDir, {
      maxAge: '1y',
      setHeaders: function(res, filepath) {
        if (mime.getType(filepath) === 'text/html') {
          helmet.noCache()(null, res, function() {});
        }
      },
      redirect: false,
    })
  );
  utils.bootstrap(app, hopsConfig);
  if (!options.static) {
    var filePath = path.join(hopsConfig.cacheDir, 'server.js');
    if (fs.existsSync(filePath)) {
      utils.registerMiddleware(app.use(helmet.noCache()), require(filePath));
    } else {
      console.log(
        'No middleware found. Delivering only statically built routes.'
      );
    }
  }
  utils.teardown(app, hopsConfig);
  return app;
}

module.exports = createApp;
