'use strict';

var webpack = require('webpack');
var merge = require('webpack-merge');

var hopsConfig = require('hops-config');
var hopsBuildConfig = require('hops-build-config');

var generate = require('./lib/generate');
var cleanup = require('./lib/cleanup');

var mergeWithPlugins = merge.strategy({ plugins: 'append' });

function injectProgressPlugin(webpackConfig) {
  return mergeWithPlugins(webpackConfig, {
    plugins: [new webpack.ProgressPlugin()],
  });
}

var buildConfig = injectProgressPlugin(require(hopsBuildConfig.buildConfig));
var nodeConfig = injectProgressPlugin(require(hopsBuildConfig.nodeConfig));

function defaultCallback(error, stats) {
  if (error) {
    console.error(error.stack ? error.stack.toString() : error.toString());
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
