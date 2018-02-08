'use strict';

var SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
var RawSource = require('webpack-sources').RawSource;

var hopsConfig = require('hops-config');

var PLUGIN_NAME = 'hops-service-worker-plugin';

module.exports = function ServiceWorkerPlugin() {
  var assetPath = hopsConfig.workerPath.replace(/^\/+/, '');
  if (hopsConfig.workerFile) {
    this.apply = function(compiler) {
      compiler.hooks.make.tapAsync(PLUGIN_NAME, function(
        compilation,
        callback
      ) {
        compilation
          .createChildCompiler(PLUGIN_NAME, { filename: assetPath }, [
            new SingleEntryPlugin(
              compiler.context,
              require.resolve('../shims/worker'),
              'worker'
            ),
          ])
          .runAsChild(callback);
      });
      compiler.hooks.emit.tap(PLUGIN_NAME, function(compilation) {
        compilation.assets[assetPath] = new RawSource(
          'HOPS_ASSETS = ' +
            JSON.stringify(
              Object.keys(compilation.assets).filter(function(item) {
                return !item.match(/\.map$/);
              })
            ) +
            ';\n' +
            compilation.assets[assetPath].source()
        );
      });
    };
  }
};
