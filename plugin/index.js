'use strict';

var path = require('path');
var events = require('events');

var mocks = require('node-mocks-http');

var util = require('../lib/util');
var createMiddleware = require('../middleware');

var Plugin = module.exports = function Plugin (config, watchOptions) {
  this.config = util.getConfig(config);
  this.middleware = createMiddleware(this.config, watchOptions);
};

Plugin.getFileName = function getFileName (location) {
  var parts = location.split('/').filter(function (part) {
    return !!part.length;
  });
  if (!parts.length || parts[parts.length - 1].indexOf('.') === -1) {
    parts.push('index.html');
  }
  return path.join.apply(path, parts);
};

Plugin.getAssetObject = function getAssetObject (string) {
  return {
    source: function () { return string; },
    size: function () { return string.length; }
  };
};

Plugin.prototype.process = function process (location) {
  var middleware = this.middleware;
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
        resolve({
          fileName: Plugin.getFileName(location),
          // eslint-disable-next-line no-underscore-dangle
          assetObject: Plugin.getAssetObject(res._getData())
        });
      }
    });
    middleware(req, res, resolve);
  });
};

Plugin.prototype.apply = function (compiler) {
  var config = this.config;
  var process = this.process.bind(this);
  compiler.plugin('emit', function (compilation, callback) {
    Promise.all(config.locations.map(process))
    .then(function (results) {
      results.forEach(function (result) {
        if (result) {
          compilation.assets[result.fileName] = result.assetObject;
        }
      });
    })
    .catch(util.logError)
    .then(callback);
  });
};
