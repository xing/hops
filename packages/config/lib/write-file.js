var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var hopsConfig = require('..');

module.exports = function Plugin (regExp) {
  mkdirp.sync(hopsConfig.buildDir);
  this.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      var assetKeys = Object.keys(compilation.assets);
      Promise.all(assetKeys.reduce(function (result, assetKey) {
        if (regExp.test(assetKey)) {
          var fileName = path.resolve(hopsConfig.buildDir, assetKey);
          var fileContent = compilation.assets[assetKey].source();
          result.push(new Promise(function (resolve, reject) {
            fs.writeFile(fileName, fileContent, function (err) {
              err ? reject(err) : resolve();
            });
          }));
        }
        return result;
      }, []))
      .then(function () { callback(); })
      .catch(callback);
    });
  };
};
