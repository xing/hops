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
    const buildName = target;
    const [buildTarget, watch] = (() => {
      switch (baseConfig || target) {
        case 'build':
          return ['browser', false];
        case 'develop':
          return ['browser', true];
        default:
          return ['server', process.env.NODE_ENV !== 'production'];
      }
    })();

    const webpackConfig = this.getWebpackConfig(buildName, buildTarget, {
      watch,
    });

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

  getWebpackConfig(buildName, buildTarget, options = {}) {
    const { watch } = options;
    const configName =
      buildTarget === 'web' ? (watch ? 'develop' : 'build') : 'node';
    // TODO: simplify this to 'web' and 'node' only
    const configPath = `../../lib/configs/${configName}`;
    const { loaderConfigs = {}, ...webpackConfig } = require(configPath)(
      this.config,
      buildName
    );

    this.configureWebpack(
      webpackConfig,
      loaderConfigs,
      buildName,
      buildTarget,
      options
    );

    debugConfig(buildName, webpackConfig);

    return webpackConfig;
  }

  configureWebpack(webpackConfig, loaderConfigs, buildName) {
    this.configureBuild(webpackConfig, loaderConfigs, buildName);
  }

  collectBuildConfigs(webpackConfigs) {
    webpackConfigs.push(this.getBuildConfig('build'));

    if (!this.options.static) {
      webpackConfigs.push(this.getBuildConfig('node'));
    }
  }

  configureBuild(webpackConfig, loaderConfigs, target) {
    // TODO: deprecate function in favour of configureWebpack
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
  getWebpackConfig: validate(callable, ([buildName, buildTarget, options]) => {
    invariant(
      typeof buildName === 'string',
      'getWebpackConfig(): Received invalid buildName string'
    );
    invariant(
      ['browser', 'server'].includes(buildTarget),
      'getWebpackConfig(): Received invalid buildTarget string, must be "browser" or "server"'
    );
    invariant(
      options === undefined || isPlainObject(options),
      'getWebpackConfig(): Received invalid options object'
    );
  }),
  configureWebpack: validate(
    sequence,
    ([webpackConfig, loaderConfigs, buildName, buildTarget, options]) => {
      invariant(
        isPlainObject(webpackConfig),
        'configureWebpack(): Received invalid webpackConfig object'
      );
      invariant(
        isPlainObject(loaderConfigs),
        'configureWebpack(): Received invalid loaderConfigs object'
      );
      invariant(
        typeof buildName === 'string',
        'configureWebpack(): Received invalid buildName string'
      );
      invariant(
        typeof buildTarget === 'string',
        'configureWebpack(): Received invalid buildTarget string'
      );
      invariant(
        isPlainObject(options),
        'configureWebpack(): Received invalid options object'
      );
    }
  ),
};

module.exports = WebpackConfigMixin;
