
var fs = require('fs');
var path = require('path');

var WebpackConfig = require('webpack-config').default;
var appRoot = require('app-root-path');

module.exports = {
  root: appRoot.toString(),
  resolve: function (fileName) {
    try {
      var filePath = appRoot.resolve(fileName);
      fs.accessSync(filePath, fs.F_OK);
      return filePath;
    }
    catch (e) {
      return path.resolve(__dirname, '..', 'etc', fileName);
    }
  },
  transform: function (fileName, transformer) {
    var result = {};
    result[module.exports.resolve(fileName)] = transformer;
    return result;
  },
  createConfig: function (config) {
    return new WebpackConfig().merge(config);
  },
  extendConfig: function (base, config) {
    return new WebpackConfig().extend(base).merge(config);
  }
};
