'use strict';

var path = require('path');

var sourceMapSupport = require('source-map-support');
var requireFromString = require('require-from-string');

var webpack = require('webpack');
var MemoryFS = require('memory-fs');

exports.transpileOnce = function transpileOnce(config) {
  sourceMapSupport.install({ hookRequire: true });
  return new Promise(function (resolve, reject) {
    var mfs = new MemoryFS();
    var compiler = webpack(config);
    compiler.outputFileSystem = mfs;
    compiler.run(function(compileError) {
      if (compileError) { reject(compileError); }
      else {
        var filePath = path.join(config.output.path, config.output.filename);
        mfs.readFile(filePath, function (readError, fileContent) {
          if (readError) {
            reject(readError);
          }
          else {
            try {
              resolve(requireFromString(fileContent.toString(), filePath));
            }
            catch (moduleError) {
              reject(moduleError);
            }
          }
        });
      }
    });
  });
};
