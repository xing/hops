const { existsSync: exists } = require('fs');
const isPlainObject = require('is-plain-obj');
const get = require('lodash.get');
const set = require('lodash.set');
const debug = require('debug');
const { sync } = require('mixinable');
const { Mixin } = require('hops-mixin');
const { internal: bootstrap } = require('hops-bootstrap');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const { sequence, callable } = sync;
const { validate, invariant } = bootstrap;

const debugConfig = (target, config) =>
  debug(`hops:webpack:config:${target}`)(config);

class WebpackConfigMixin extends Mixin {
  getBuildConfig(target, baseConfig) {
    const { loaderConfigs = {}, ...webpackConfig } = (() => {
      switch (baseConfig || target) {
        case 'build':
          return require('../../lib/configs/build')(this.config, target);
        case 'develop':
          return require('../../lib/configs/develop')(this.config, target);
        case 'node':
          return require('../../lib/configs/node')(this.config, target);
        default:
          if (baseConfig && exists(baseConfig)) {
            return require(baseConfig)(this.config, target);
          }

          throw new Error(`Can't get build config ${baseConfig || target}`);
      }
    })();

    this.configureBuild(webpackConfig, loaderConfigs, target);

    const isBuild =
      target === 'build' ||
      (target === 'node' && process.env.NODE_ENV === 'production');

    const smp = new SpeedMeasurePlugin({
      disable: !(this.options.profile && isBuild),
    });
    const wrapped = smp.wrap(webpackConfig);

    debugConfig(target, wrapped);

    return wrapped;
  }

  collectBuildConfigs(webpackConfigs) {
    webpackConfigs.push(this.getBuildConfig('build'));

    if (!this.options.static) {
      webpackConfigs.push(this.getBuildConfig('node'));
    }
  }

  configureBuild(webpackConfig, loaderConfigs, target) {
    const { module, performance } = webpackConfig;
    const configLoaderConfig = {
      test: require.resolve('hops-bootstrap/lib/config'),
      loader: require.resolve('../../lib/utils/loader'),
      options: {
        type: target,
        mixins: this.config._mixins,
        config: this.config._config,
        rootDir: this.config._config.rootDir,
      },
    };

    if (target === 'node') {
      configLoaderConfig.options.type = 'server';
    }

    if (target === 'develop' || target === 'build') {
      configLoaderConfig.options.type = 'browser';
      configLoaderConfig.options.config = Object.entries(
        this.config.browserWhitelist
      ).reduce((config, [keyPath, visible]) => {
        const value = get(this.config._config, keyPath);

        if (visible && typeof value !== 'undefined') {
          return set(config, keyPath, value);
        }

        return config;
      }, {});
    }

    module.rules.push(configLoaderConfig);

    if (typeof this.getLogger === 'function') {
      const { LoggerPlugin } = require('../../lib/plugins/log');

      webpackConfig.plugins.push(
        new LoggerPlugin(this.getLogger(), { ...performance }, target)
      );

      webpackConfig.performance.hints = false;
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

WebpackConfigMixin.strategies = {
  getBuildConfig: validate(callable, ([target, baseConfig]) => {
    invariant(
      typeof target === 'string',
      'getBuildConfig(): Received invalid target string'
    );
    invariant(
      !baseConfig || typeof baseConfig === 'string',
      'getBuildConfig(): Received invalid baseConfig string'
    );
  }),
  collectBuildConfigs: validate(sequence, ([webpackConfigs]) => {
    invariant(
      Array.isArray(webpackConfigs),
      'collectBuildConfigs(): Received invalid webpackConfigs array'
    );
  }),
  configureBuild: validate(
    sequence,
    ([webpackConfig, loaderConfigs, target]) => {
      invariant(
        isPlainObject(webpackConfig),
        'configureBuild(): Received invalid webpackConfig object'
      );
      invariant(
        isPlainObject(loaderConfigs),
        'configureBuild(): Received invalid loaderConfigs object'
      );
      invariant(
        typeof target === 'string',
        'configureBuild(): Received invalid target string'
      );
    }
  ),
};

module.exports = WebpackConfigMixin;
