'use strict';

var index = require('directory-index');
var RawSource = require('webpack-sources').RawSource;

var createRenderer = require('../renderer');

var Plugin = function Plugin (locations, webpackConfig, watchOptions) {
  this.locations = locations || [];
  this.render = createRenderer(webpackConfig, watchOptions);
};

Plugin.prototype.generate = function generate (location) {
  return this.render(location).then(function (result) {
    return result && {
      fileName: index(location).replace(/^\//, ''),
      assetObject: new RawSource(result)
    };
  });
};

Plugin.prototype.generateAll = function generateAll () {
  var generate = this.generate.bind(this);
  return Promise.all(this.locations.map(generate))
  .then(function (results) {
    return results.reduce(function (htmlAssets, result) {
      if (result) {
        htmlAssets[result.fileName] = result.assetObject;
      }
      return htmlAssets;
    }, {});
  });
};

Plugin.prototype.apply = function (compiler) {
  var generateAll = this.generateAll.bind(this);
  compiler.plugin('emit', function (compilation, callback) {
    generateAll()
    .then(function (htmlAssets) {
      Object.assign(compilation.assets, htmlAssets);
      callback();
    })
    .catch(callback);
  });
};

module.exports = Plugin;
