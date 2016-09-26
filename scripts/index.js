'use strict';

var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');

/** @ignore */
function fileExists(filePath) {
  try { fs.accessSync(filePath, fs.F_OK); return true; }
  catch (e) { return false; }
}

/** @ignore */
function findFile(fileName, prefixes) {
  var filePath = fileName;
  while (!fileExists(filePath) && prefixes.length) {
    try { filePath = require.resolve(path.join(prefixes.shift(), fileName)); }
    catch (e) {} // eslint-disable-line no-empty
  }
  if (!fileExists(filePath)) {
    throw new Error('cannot find: ' + fileName);
  }
  return filePath;
}

var config = appRoot.require('package.json').hops || {};

module.exports = {
  requireConfig: function (fileName) {
    return Object.assign({}, require(findFile(fileName, [].concat(
      appRoot.toString(),
      config.configPath || [],
      path.resolve(__dirname, '..', 'etc')
    ))));
  },
  runScript: function (fileName) {
    return require(findFile(fileName, [].concat(
      appRoot.resolve('scripts'),
      config.scriptPath || [],
      __dirname
    )));
  },
  config: config
};
