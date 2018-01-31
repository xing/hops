'use strict';

var events = require('events');

var express = require('express');
var mocks = require('node-mocks-http');

var hopsConfig = require('hops-config');
var hopsExpressUtils = require('hops-express').utils;

var createMiddleware = require('./middleware');

module.exports = function createRenderer(webpackConfig, watchOptions) {
  var router = new express.Router();
  hopsExpressUtils.bootstrap(router, hopsConfig);
  hopsExpressUtils.registerMiddleware(
    router,
    createMiddleware(webpackConfig, watchOptions)
  );
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
