'use strict';

const { Compilation, EntryPlugin } = require('webpack');
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
          new EntryPlugin(
            compiler.context,
            require.resolve('./worker-shim'),
            'worker'
          ),
        ])
        .runAsChild(callback);
    }

    function onEmit(assets, callback) {
      assets[publicWorkerFilename] = new ConcatSource(
        new RawSource(
          'HOPS_ASSETS = ' +
            JSON.stringify(
              Object.keys(assets).filter(function (item) {
                return (
                  !item.match(
                    /hot-update\.js(:?on)?|\.webmanifest|\.map|assets\.json$/
                  ) && item !== publicWorkerFilename
                );
              })
            ) +
            ';'
        ),
        assets[publicWorkerFilename]
      );
      callback();
    }

    compiler.hooks.make.tapAsync(PLUGIN_NAME, (compilation, callback) => {
      onMake(compilation, callback);

      compilation.hooks.processAssets.tapAsync(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_DERIVED,
        },
        onEmit
      );
    });
  }
};
