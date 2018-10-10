'use strict';

var SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
var { ConcatSource, RawSource } = require('webpack-sources');

var PLUGIN_NAME = 'hops-service-worker-plugin';

module.exports = function ServiceWorkerPlugin({ workerFile, workerPath }) {
  var assetPath = workerPath.replace(/^\/+/, '');

  this.apply = function(compiler) {
    if (!workerFile) {
      return;
    }

    function onMake(compilation, callback) {
      compilation
        .createChildCompiler(PLUGIN_NAME, { filename: assetPath }, [
          new SingleEntryPlugin(
            compiler.context,
            require.resolve('./worker-shim'),
            'worker'
          ),
        ])
        .runAsChild(callback);
    }

    function onEmit(compilation, callback) {
      compilation.assets[publicWorkerFilename] = new ConcatSource(
        new RawSource(
          'HOPS_ASSETS = ' +
            JSON.stringify(
              Object.keys(compilation.assets).filter(function(item) {
                return (
                  !item.match(
                    /hot-update\.js(:?on)?|\.webmanifest|\.map|assets\.json$/
                  ) && item !== publicWorkerFilename
                );
              })
            ) +
            ';'
        ),
        compilation.assets[publicWorkerFilename]
      );
      callback();
    }

    if (typeof compiler.hooks !== 'undefined') {
      compiler.hooks.make.tapAsync(PLUGIN_NAME, onMake);
    } else {
      compiler.plugin('make', onMake);
    }

    if (typeof compiler.hooks !== 'undefined') {
      compiler.hooks.emit.tapAsync(PLUGIN_NAME, onEmit);
    } else {
      compiler.plugin('emit', onEmit);
    }
  };
};
