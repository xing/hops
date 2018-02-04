'use strict';

var webpack = require('webpack');

var hopsConfig = require('hops-config');
var hopsBuildConfig = require('hops-build-config');

var generate = require('./generate');
var cleanup = require('./cleanup');

var buildConfig = hopsBuildConfig.build;
var nodeConfig = hopsBuildConfig.node;

function defaultCallback(error, stats) {
  if (error) {
    console.error(error.stack.toString());
  } else {
    console.log(stats.toString({ chunks: false, modules: false }));
  }
}

function getBuildFunction(options, _callback) {
  var callback = _callback || defaultCallback;
  if (options.static) {
    return function() {
      webpack(buildConfig).run(function(error, stats) {
        if (error) {
          callback(error, stats);
        } else {
          (hopsConfig.generate || generate)(nodeConfig)
            .then(callback.bind(null, null, stats))
            .catch(callback);
        }
      });
    };
  } else {
    return function() {
      webpack([buildConfig, nodeConfig]).run(callback);
    };
  }
}

module.exports = function runBuild(options, callback) {
  var build = getBuildFunction(options, callback);
  if (options.clean) {
    var dirs = [hopsConfig.buildDir, hopsConfig.cacheDir];
    return cleanup(dirs).then(build);
  } else {
    return build();
  }
};
