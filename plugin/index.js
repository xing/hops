'use strict';

var index = require('directory-index');
var RawSource = require('webpack-sources').RawSource;

var createRenderer = require('../renderer');

function getFileName (location) {
  return index(location).replace(/^\//, '');
}

var Plugin = function Plugin (locations, webpackConfig, watchOptions) {
  this.render = createRenderer(webpackConfig, watchOptions);
  this.locations = locations || [];
};

Plugin.prototype.apply = function apply (compiler) {
  var render = this.render;
  var locations = this.locations;
  compiler.plugin('emit', function (compilation, callback) {
    Promise.all(locations.map(function (location) {
      return render(location).then(function (html) {
        if (html) {
          compilation.assets[getFileName(location)] = new RawSource(html);
        }
      });
    }))
    .then(function () { callback(); })
    .catch(callback);
  });
};

module.exports = Plugin;
