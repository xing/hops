'use strict';

var events = require('events');

var express = require('express');
var mocks = require('node-mocks-http');

var hopsConfig = require('hops-config');
var createMiddleware = require('hops-middleware');

module.exports = function createRenderer(webpackConfig, watchOptions) {
  if (arguments.length === 1 && 'webpackConfig' in webpackConfig) {
    webpackConfig = webpackConfig.webpackConfig;
    watchOptions = webpackConfig.watchOptions;
    console.warn(
      'Calling createRenderer() with just an options hash is deprecated.',
      'Please refer to the latest docs:',
      'https://github.com/xing/hops/blob/master/packages/renderer/README.md'
    );
  }
  var router = new express.Router();
  if (hopsConfig.bootstrapServer) {
    hopsConfig.bootstrapServer(router, hopsConfig);
  }
  router.use(createMiddleware(webpackConfig, watchOptions));
  return function(options) {
    if (typeof options === 'string') {
      options = { url: options };
    }
    return new Promise(function(resolve, reject) {
      var req = mocks.createRequest(options);
      var res = mocks.createResponse({
        eventEmitter: events.EventEmitter,
        request: req,
      });
      res.on('finish', function() {
        if (res.statusCode !== 200) {
          reject(new Error('invalid status code: ' + res.statusCode));
        } else {
          resolve(res._getData());
        }
      });
      router.handle(req, res, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
};
