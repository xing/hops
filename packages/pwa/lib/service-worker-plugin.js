'use strict';

const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const { ConcatSource, RawSource } = require('webpack-sources');

const PLUGIN_NAME = 'hops-service-worker-plugin';

module.exports = class ServiceWorkerPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { workerFile, workerPath } = this.options;

    if (!workerFile) {
      return;
    }

    const publicWorkerFilename = workerPath.replace(/^\/+/, '');

    function onMake(compilation, callback) {
      compilation
        .createChildCompiler(PLUGIN_NAME, { filename: publicWorkerFilename }, [
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
              Object.keys(compilation.assets).filter(function (item) {
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

    compiler.hooks.make.tapAsync(PLUGIN_NAME, onMake);
    compiler.hooks.emit.tapAsync(PLUGIN_NAME, onEmit);
  }
};
