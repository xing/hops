'use strict';

var events = require('events');

var mocks = require('node-mocks-http');

var createMiddleware = require('../middleware');

module.exports = function createRenderer (hopsConfig, watchOptions) {
  var middleware = createMiddleware(hopsConfig, watchOptions);

  return function (location) {
    return new Promise(function (resolve, reject) {
      var req = mocks.createRequest({
        url: location
      });
      var res = mocks.createResponse({
        eventEmitter: events.EventEmitter,
        request: req
      });
      res.on('finish', function () {
        if (res.statusCode !== 200) {
          reject('invalid status code: ' + res.statusCode);
        } else {
          resolve(res._getData());
        }
      });
      middleware(req, res, function (error) {
        if (error) { reject(error); } else { resolve(); }
      });
    });
  };
};
