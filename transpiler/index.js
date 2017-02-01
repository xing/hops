'use strict';

var path = require('path');
var EventEmitter = require('events');

var sourceMapSupport = require('source-map-support');
var requireFromString = require('require-from-string');

var webpack = require('webpack');
var MemoryFS = require('memory-fs');

module.exports = function transpile (webpackConfig, watchOptions) {
  sourceMapSupport.install({ hookRequire: true });

  var emitter = new EventEmitter();

  var mfs = new MemoryFS();
  var compiler = webpack(webpackConfig);

  compiler.outputFileSystem = mfs;
  compiler.plugin('watch-run', function (_, callback) {
    emitter.emit('recompile');
    callback();
  });

  function emitResult () {
    emitter.emit.apply(emitter, arguments);
    emitter.emit('result');
  }

  function handleCompilation (compileError, stats) {
    if (compileError) {
      emitResult('error', compileError);
    } else {
      var filePath = path.join(
        webpackConfig.output.path,
        webpackConfig.output.filename
      );
      mfs.readFile(filePath, function (readError, fileContent) {
        if (readError) {
          emitResult('error', readError);
        } else {
          try {
            var source = fileContent.toString();
            var result = requireFromString(source, filePath);
            emitResult('success', result, stats);
          } catch (moduleError) {
            emitResult('error', moduleError);
          }
        }
      });
    }
  }

  if (watchOptions) {
    var watcher = compiler.watch(watchOptions, handleCompilation);
    emitter.close = watcher.close.bind(watcher);
  } else {
    compiler.run(handleCompilation);
  }

  return emitter;
};
