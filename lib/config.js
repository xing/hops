
var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');

function getFilePath(fileName, fallback) {
  try {
    var filePath = appRoot.resolve(fileName);
    fs.accessSync(filePath, fs.F_OK);
    return filePath;
  }
  catch (e) {
    return path.resolve(__dirname, fallback);
  }
}

function overrideConfig(config) {
  try { return Object.assign(config, appRoot.require('.hopsrc')); }
  catch (e) { return config; }
}

module.exports = overrideConfig({
  appRoot: appRoot.toString(),
  eslint: getFilePath('.eslintrc.js', '../etc/eslint.js'),
  stylelint: getFilePath('.stylelintrc.js', '../etc/stylelint.js'),
  webpackBase: getFilePath('webpack.base.js', '../etc/webpack.base.js'),
  webpackDev: getFilePath('webpack.dev.js', '../etc/webpack.dev.js'),
  webpackBuild: getFilePath('webpack.build.js', '../etc/webpack.build.js'),
  webpackNode: getFilePath('webpack.node.js', '../etc/webpack.node.js')
});
