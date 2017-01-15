'use strict';

var path = require('path');
var EventEmitter = require('events');

var sourceMapSupport = require('source-map-support');
var requireFromString = require('require-from-string');

var webpack = require('webpack');
var MemoryFS = require('memory-fs');


module.exports = function transpile(config, watchOptions) {
  sourceMapSupport.install({ hookRequire: true });

  var emitter = new EventEmitter();

  var mfs = new MemoryFS();
  var compiler = webpack(config);

  compiler.outputFileSystem = mfs;
  compiler.plugin('compile', function () {
    emitter.emit('start');
  });

  function handleCompilation(compileError, stats) {
    if (compileError) {
      emitter.emit('error', compileError);
    }
    else {
      var filePath = path.join(config.output.path, config.output.filename);
      mfs.readFile(filePath, function (readError, fileContent) {
        if (readError) {
          emitter.emit('error', readError);
        }
        else {
          try {
            var result = requireFromString(fileContent.toString(), filePath);
            emitter.emit('success', result, stats);
          }
          catch (moduleError) {
            emitter.emit('error', moduleError);
          }
        }
      });
    }
  }

  if (watchOptions) {
    var watcher = compiler.watch(watchOptions, handleCompilation);
    emitter.close = watcher.close.bind(watcher);
  }
  else {
    compiler.run(handleCompilation);
  }

  return emitter;
};
