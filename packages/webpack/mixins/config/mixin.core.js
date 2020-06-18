const isPlainObject = require('is-plain-obj');
const get = require('lodash.get');
const set = require('lodash.set');
const debug = require('debug');
const { sync } = require('mixinable');
const { Mixin, internal: bootstrap } = require('hops-bootstrap');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const { sequence, callable } = sync;
const { validate, invariant } = bootstrap;

const debugConfig = (target, config) =>
  debug(`hops:webpack:config:${target}`)(config);

class WebpackConfigMixin extends Mixin {
  getBuildConfig(target, baseConfig) {
    // TODO: deprecate function in favour of getWebpackConfig
    const name = target;
    const [webpackTarget, options] = (() => {
      switch (baseConfig || target) {
        case 'build':
          return ['web', {}];
        case 'develop':
          return ['web', { develop: true }];
        default:
          return ['node', { develop: process.env.NODE_ENV !== 'production' }];
      }
    })();

    const webpackConfig = this.getWebpackConfig(name, webpackTarget, options);

    const isBuild =
      target === 'build' ||
      (target === 'node' && process.env.NODE_ENV === 'production');

    // TODO: move this to where the build happens
    const smp = new SpeedMeasurePlugin({
      disable: !(this.options.profile && isBuild),
    });
    const wrapped = smp.wrap(webpackConfig);

    return wrapped;
  }

  getWebpackConfig(name, webpackTarget, options = {}) {
    // TODO: simplify this to 'web' and 'node' only
    const baseConfig =
      webpackTarget === 'web'
        ? options.develop
          ? 'develop'
          : 'build'
        : 'node';
    const { buildName = baseConfig } = options;
    const configPath = `../../lib/configs/${baseConfig}`;
    const { loaderConfigs = {}, ...webpackConfig } = require(configPath)(
      this.config,
      `${name}:${webpackTarget}`
    );

    // TODO: rename this to configureWebpack.
    // Configuring debug things should also work the same for 'node' and 'web'.
    this.configureBuild(webpackConfig, loaderConfigs, buildName, webpackTarget);

    debugConfig(buildName, webpackConfig);

    return webpackConfig;
  }

  collectBuildConfigs(webpackConfigs) {
    webpackConfigs.push(this.getBuildConfig('build'));

    if (!this.options.static) {
      webpackConfigs.push(this.getBuildConfig('node'));
    }
  }

  collectCompilationRequests() {}

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
  getWebpackConfig: validate(callable, ([name, webpackTarget, options]) => {
    invariant(
      typeof name === 'string',
      'getWebpackConfig(): Received invalid name string'
    );
    invariant(
      typeof webpackTarget === 'string',
      'getWebpackConfig(): Received invalid webpackTarget string'
    );
    invariant(
      options === undefined || isPlainObject(options),
      'getWebpackConfig(): Received invalid options object'
    );
  }),
  collectCompilationRequests: validate(sequence, ([mode, requests]) => {
    invariant(
      typeof mode === 'string',
      'collectCompilationRequests(): Received invalid mode string'
    );
    invariant(
      Array.isArray(requests),
      'collectCompilationRequests(): Received invalid requests array'
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
