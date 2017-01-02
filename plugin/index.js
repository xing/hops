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


/**
 * @description creates hops webpack plugin instance
 *
 * @class
 *
 * @param {?Object}   options
 * @param {?string[]} options.locations
 * @param {?string}   options.config
 */
var Plugin = module.exports = function Plugin() {};


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


/**
 * @description hooks into webpack compiler lifecycle and produces html
 *
 * @private
 *
 * @param {!Object} compiler
 * @return {undefined}
 */
Plugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    util.loadConfig().then(function (config) {
      var webpackConfig = require(config.configs.render);
      var transpilation = util.transpile(webpackConfig);
      return transpilation.then(function (handle) {
        return Promise.all(config.locations.map(function (location) {
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
                var fileName = Plugin.getFileName(location);
                // eslint-disable-next-line no-underscore-dangle
                var assetObject = Plugin.getAssetObject(res._getData());
                compilation.assets[fileName] = assetObject;
                resolve();
              }
            });
            handle(req, res, resolve);
          });
        }));
      });
    })
    .catch(function (error) {
      // eslint-disable-next-line no-console
      if (error) { console.log('[HOPS PLUGIN ERROR]:', error); }
    })
    .then(function () { callback(); });
  });
};
