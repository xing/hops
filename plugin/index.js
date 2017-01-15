/**
 * @file plugin/index
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 * @author Gregor Adams <greg@pixelass.com>
 */
'use strict';

var path = require('path');
var events = require('events');

var mocks = require('node-mocks-http');

var util = require('../lib/util');
var createMiddleware = require('../middleware');


/**
 * @description creates hops webpack plugin instance
 *
 * @class
 *
 * @param {?Object}   config
 * @param {?string[]} config.locations
 * @param {?string}   config.config
 */
var Plugin = module.exports = function Plugin(config) {
  this.config = config;
};


/** @ignore */
Plugin.getFileName = function getFileName(location) {
  var parts = location.split('/').filter(function (part) {
    return !!part.length;
  });
  if (!parts.length || parts[parts.length - 1].indexOf('.') === -1) {
    parts.push('index.html');
  }
  return path.join.apply(path, parts);
};


/** @ignore */
Plugin.getAssetObject = function getAssetObject(string) {
  return {
    source: function() { return string; },
    size: function() { return string.length; }
  };
};


/** @ignore */
Plugin.getHandler = function getHandler(hopsConfig) {
  var middleware = createMiddleware(hopsConfig);
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
        }
        else {
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
};


/** @ignore */
Plugin.prototype.process = function process(compilation, callback) {
  util.loadConfig(this.config).then(function (config) {
    return Promise.all(config.locations.map(Plugin.getHandler(config)))
    .then(function (results) {
      results.forEach(function (result) {
        if (result) {
          compilation.assets[result.fileName] = result.assetObject;
        }
      });
    });
  })
  .catch(util.logError)
  .then(callback);
};


/**
 * @description hooks into webpack compiler lifecycle and produces html
 *
 * @private
 *
 * @param {!Object} compiler
 * @return {undefined}
 */
Plugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', this.process.bind(this));
};
