'use strict';

var SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
var RawSource = require('webpack-sources').RawSource;

var hopsConfig = require('hops-config');

var PLUGIN_NAME = 'hops-service-worker-plugin';

module.exports = function ServiceWorkerPlugin() {
  var assetPath = hopsConfig.workerPath.replace(/^\/+/, '');

  this.apply = function(compiler) {
    if (!hopsConfig.workerFile) {
      return;
    }

    function onMake(compilation, callback) {
      compilation
        .createChildCompiler(PLUGIN_NAME, { filename: assetPath }, [
          new SingleEntryPlugin(
            compiler.context,
            require.resolve('../shims/worker-shim'),
            'worker'
          ),
        ])
        .runAsChild(callback);
    }

    function onEmit(compilation, callback) {
      compilation.assets[assetPath] = new RawSource(
        'HOPS_ASSETS = ' +
          JSON.stringify(
            Object.keys(compilation.assets).filter(function(item) {
              return !item.match(/\.map|stats\.json$/) && item !== assetPath;
            })
          ) +
          ';\n' +
          compilation.assets[assetPath].source()
      );
      callback();
    }

    if (typeof compiler.hooks !== 'undefined') {
      compiler.hooks.make.tapAsync(PLUGIN_NAME, onMake);
    } else {
      compiler.plugin('make', onMake);
    }

    if (typeof compiler.hooks !== 'undefined') {
      compiler.hooks.emit.tap(PLUGIN_NAME, onEmit);
    } else {
      compiler.plugin('emit', onEmit);
    }
  };
};
