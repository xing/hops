/**
 * @file plugin/renderer
 *
 * @author Daniel Dembach <daniel@dmbch.net>
 */
'use strict';

var path = require('path');

var webpack = require('webpack');
var MemoryFS = require('memory-fs');

/** @ignore */
exports.eval = function (fileContent, filePath, callback) {
  try {
    Object.keys(require.cache).forEach(function(key) {
      delete require.cache[key];
    });
    var context = Object.assign(
      new module.constructor(),
      { paths: module.paths }
    );
    // eslint-disable-next-line no-underscore-dangle
    context._compile(fileContent.toString(), filePath);
    callback(null, context.exports.default || context.exports);
  }
  catch (error) {
    callback(error);
  }
};

/** @ignore */
exports.createRenderer = function (configFile) {
  if (!configFile) {
    return Promise.resolve(function () {
      return Promise.resolve({ state: '{}', dom: ''});
    });
  }
  return Promise.resolve().then(function () {
    return new Promise(function (resolve, reject) {
      var mfs = new MemoryFS();
      var config = require(configFile);
      var compiler = webpack(config);
      compiler.outputFileSystem = mfs;
      compiler.run(function(compileError) {
        if (compileError) { reject(compileError); }
        else {
          var filePath = path.join(config.output.path, config.output.filename);
          mfs.readFile(filePath, function (readFileError, fileContent) {
            if (readFileError) { reject(readFileError); }
            else {
              exports.eval(fileContent, filePath, function (evalError, result) {
                if (evalError) { reject(evalError); }
                else { resolve(result); }
              });
            }
          });
        }
      });
    });
  });
};
