const { Mixin } = require('hops-mixin');
const { join, trimSlashes } = require('pathifist');
const get = require('lodash.get');
const set = require('lodash.set');
const ServiceWorkerPlugin = require('./lib/service-worker-plugin');

const getAssetPath = (...args) => trimSlashes(join(...args));

class PWAMixin extends Mixin {
  configureBuild(webpackConfig, { allLoaderConfigs }, target) {
    const webmanifestLoader = {
      test: /(\.webmanifest|browserconfig\.xml)$/,
      use: [
        {
          loader: require.resolve('file-loader'),
          options: {
            name: getAssetPath(this.config.assetPath, '[name]-[hash:16].[ext]'),
            emitFile: target === 'build' || target === 'develop',
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
