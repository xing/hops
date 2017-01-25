'use strict';

var path = require('path');

var util = require('../lib/util');
var createRenderer = require('../renderer');

var Plugin = module.exports = function Plugin (hopsConfig, watchOptions) {
  this.config = util.getConfig(hopsConfig);
  this.render = createRenderer(this.config, watchOptions);
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
  return this.render(location).then(function (result) {
    return result && {
      fileName: Plugin.getFileName(location),
      assetObject: Plugin.getAssetObject(result)
    };
  });
};

Plugin.prototype.apply = function (compiler) {
  var process = this.process.bind(this);
  var locations = this.config.locations;

  if (locations && locations.length) {
    compiler.plugin('emit', function (compilation, callback) {
      Promise.all(locations.map(process))
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
  }
};
