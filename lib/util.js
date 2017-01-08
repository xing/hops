'use strict';

var fs = require('fs');
var path = require('path');

var appRoot = require('app-root-path');
var explorer = require('cosmiconfig')('hops');
var requireFromString = require('require-from-string');

var webpack = require('webpack');
var MemoryFS = require('memory-fs');

var npmlog = require('npmlog');


exports.loadConfig = function loadConfig() {
  return explorer.load(appRoot.toString())
  .then(function (result) {
    if (!result) { result = {}; }
    var config = Object.assign(
      {
        configs: Object.assign(
          {
            build: require.resolve('../etc/build'),
            develop: require.resolve('../etc/develop'),
            render: require.resolve('../etc/render')
          },
          result.config ? result.config.configs : {}
        ),
        locations: []
      },
      result.config
    );
    Object.keys(config.configs).forEach(function (key) {
      if (!fs.existsSync(config.configs[key])) {
        config.configs[key] = appRoot.resolve(config.configs[key]);
      }
    });
    return config;
  });
};


exports.transpile = function transpile(config) {
  require('source-map-support').install({
    hookRequire: true
  });
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


exports.log = function log() {
  npmlog.log.apply(npmlog, ['info', 'hops'].concat(Array.from(arguments)));
};


exports.logError = function logError(err) {
  npmlog.log('error', 'hops', err.stack.toString());
};
