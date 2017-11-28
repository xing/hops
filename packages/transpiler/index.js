'use strict';

var path = require('path');
var EventEmitter = require('events');

var webpack = require('webpack');
var MemoryFS = require('memory-fs');

var sourceMapSupport = require('source-map-support');
var requireFromString = require('require-from-string');

module.exports = function transpile(webpackConfig, watchOptions) {
  var emitter = new EventEmitter();
  var compiler = webpack(webpackConfig);

  compiler.outputFileSystem = new MemoryFS();

  compiler.plugin('watch-run', function(compilation, callback) {
    emitter.emit('start');
    callback();
  });

  function emitResult() {
    emitter.emit.apply(emitter, arguments);
    emitter.emit('result');
  }

  function handleCompilation(compileError, stats) {
    if (compileError) {
      emitResult('error', compileError);
    } else if (stats.hasErrors()) {
      stats.toJson().errors.forEach(emitResult.bind(null, 'error'));
    } else if (stats.hasWarnings()) {
      stats.toJson().warnings.forEach(emitResult.bind(null, 'error'));
    } else {
      var filePath = path.join(
        webpackConfig.output.path,
        webpackConfig.output.filename
      );
      compiler.outputFileSystem.readFile(filePath, function(
        readError,
        fileContent
      ) {
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

  if (webpackConfig.devtool) {
    sourceMapSupport.install({ hookRequire: true });
  }

  if (watchOptions) {
    compiler.watch(watchOptions, handleCompilation);
  } else {
    compiler.run(handleCompilation);
  }

  process.nextTick(emitter.emit.bind(emitter, 'start'));

  return emitter;
};
