const { Mixin } = require('@untool/core');
const {
  uri: { resolveRelative },
} = require('@untool/express');
const ServiceWorkerPlugin = require('./lib/service-worker-plugin');

class PWAMixin extends Mixin {
  getWorkerConfig() {
    return {
      ...this.config,
      mixins: { browser: [], server: [], core: [] },
    };
  }

  configureBuild(webpackConfig, { allLoaderConfigs }, target) {
    const webmanifestLoader = {
      test: /\.webmanifest$/,
      use: [
        {
          loader: require.resolve('file-loader'),
          options: {
            name: resolveRelative(
              this.config.assetPath,
              '[name]-[hash:16].[ext]'
            ),
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
        'hops-worker-config': require.resolve('./lib/loader-shim'),
      };
      webpackConfig.module.rules.unshift({
        test: require.resolve('./lib/loader-shim'),
        loader: require.resolve('@untool/webpack/lib/utils/loader'),
        options: { target: 'browser', config: this.getWorkerConfig() },
      });
      webpackConfig.plugins.push(
        new ServiceWorkerPlugin({
          workerFile: this.config.workerFile,
          workerPath: this.config.workerPath,
        })
      );
    }

    return webpackConfig;
  }
}

module.exports = PWAMixin;
