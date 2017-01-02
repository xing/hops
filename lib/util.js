'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');

var appRoot = require('app-root-path');
var explorer = require('cosmiconfig')('hops');
var requireFromString = require('require-from-string');

var webpack = require('webpack');
var MemoryFS = require('memory-fs');


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
            resolve(requireFromString(fileContent.toString(), filePath));
          }
        });
      }
    });
  });
};


exports.log = function log() {
  // eslint-disable-next-line no-console
  console.log(util.format.apply(util, arguments));
};
