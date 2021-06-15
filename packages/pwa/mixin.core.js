const { Mixin } = require('hops-mixin');
const { join, trimSlashes } = require('pathifist');
const get = require('lodash.get');
const set = require('lodash.set');
const ServiceWorkerPlugin = require('./lib/service-worker-plugin');

const getAssetPath = (...args) => trimSlashes(join(...args));

class PWAMixin extends Mixin {
  configureBuild(
    webpackConfig,
    { fileLoaderConfig, urlLoaderConfig, allLoaderConfigs },
    target
  ) {
    const filename = getAssetPath(
      this.config.assetPath,
      '[name]-[hash:16].[ext]'
    );
    const emitFile = target === 'build' || target === 'develop';
    const loaderIndex = urlLoaderConfig.oneOf.findIndex(
      ({ resourceQuery: r }) =>
        r instanceof RegExp && 'noinline'.match(r) !== null
    );

    // Rolling back to file-loader here, because the app-manifest-loader
    // isn't able to deal with Asset Modules, yet.
    delete fileLoaderConfig.type;
    delete fileLoaderConfig.generator;
    fileLoaderConfig.loader = require.resolve('file-loader');
    fileLoaderConfig.options = {
      name: filename,
      esModule: false,
      emitFile,
    };
    urlLoaderConfig.oneOf[loaderIndex] = {
      resourceQuery: /noinline/,
      ...fileLoaderConfig,
    };

    const webmanifestLoader = {
      test: /(\.webmanifest|browserconfig\.xml)$/,
      use: [
        {
          loader: require.resolve('file-loader'),
          options: {
            name: filename,
            emitFile,
          },
        },
        {
          loader: require.resolve('app-manifest-loader'),
        },
      ],
    };
    allLoaderConfigs.splice(allLoaderConfigs.length - 1, 0, webmanifestLoader);

    if (target === 'build' || target === 'develop') {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        'hops-worker-entry-point': this.config.workerFile,
      };
      webpackConfig.module.rules.push({
        test: require.resolve('./lib/loader-shim'),
        loader: require.resolve('hops-webpack/lib/utils/loader'),
        options: {
          type: 'worker',
          config: Object.entries(this.config.browserWhitelist).reduce(
            (config, [keyPath, visible]) => {
              const value = get(this.config._config, keyPath);
              if (visible && typeof value !== 'undefined') {
                return set(config, keyPath, value);
              }
              return config;
            },
            {}
          ),
          mixins: this.config._mixins,
          rootDir: this.config._config.rootDir,
        },
      });
      webpackConfig.plugins.push(
        new ServiceWorkerPlugin({
          workerFile: this.config.workerFile,
          workerPath: this.config.workerPath,
        })
      );
    }
  }
}

module.exports = PWAMixin;
