var fs = require('fs');
var mkdirp = require('mkdirp');

var hopsRoot = require('hops-root');
var hopsConfig = require('..');

module.exports = function Plugin () {
  var regExps = Array.from(arguments);
  this.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      var assetKeys = Object.keys(compilation.assets);
      mkdirp.sync(hopsConfig.buildDir);
      Promise.all(regExps.reduce(function (result, regExp) {
        for (var i = 0; i < assetKeys.length; i++) {
          if (regExp.test(assetKeys[i])) {
            var fileName = hopsRoot.resolve(hopsConfig.buildDir, assetKeys[i]);
            var fileContent = compilation.assets[assetKeys[i]].source();
            result.push(new Promise(function (resolve, reject) {
              fs.writeFile(fileName, fileContent, function (err) {
                err ? reject(err) : resolve();
              });
            }));
          }
        }
        return result;
      }, []))
      .then(function () { callback(); })
      .catch(callback);
    });
  };
};
