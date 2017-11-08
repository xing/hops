'use strict';

var index = require('directory-index');
var RawSource = require('webpack-sources').RawSource;

var createRenderer = require('hops-renderer');

function getFileName (location) {
  return index(location).replace(/^\//, '');
}

module.exports = function Plugin (options) {
  var render = createRenderer(options);
  this.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      Promise.all((options.locations || []).map(function (location) {
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
};
