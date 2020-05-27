const minimatch = require('minimatch');
const { Mixin } = require('hops-bootstrap');

function include(patterns) {
  return (path) =>
    // allow everything outside of node_modules
    !path.includes('node_modules') ||
    // allow all hops packages
    /node_modules[/\\]hops/.test(path) ||
    // check if any other rule matches
    patterns.some((rule) => minimatch(path, rule));
}

function findResolved(a, b) {
  try {
    return a === require.resolve(b);
  } catch {
    return false;
  }
}

class WebpackOptimizationsMixin extends Mixin {
  configureBuild(webpackConfig, { allLoaderConfigs, jsLoaderConfig }, target) {
    const { fastDev } = this.options;

    if (!fastDev) {
      return;
    }

    const { NODE_ENV } = process.env;
    const isDevelop = target === 'develop' || NODE_ENV !== 'production';
    const skipPolyfilling = fastDev && isDevelop;

    if (skipPolyfilling) {
      const { experimental: { babelIncludePatterns = [] } = {} } = this.config;

      jsLoaderConfig.include = include(babelIncludePatterns);
      jsLoaderConfig.exclude = [];

      webpackConfig.entry = []
        .concat(webpackConfig.entry)
        .filter((entry) => !/(core-js|regenerator-runtime)/.test(entry));

      const [, presetEnvOptions] =
        jsLoaderConfig.options.presets
          .filter(Array.isArray)
          .find(([path]) => findResolved(path, '@babel/preset-env')) || [];

      if (presetEnvOptions) {
        presetEnvOptions.useBuiltIns = false;
        delete presetEnvOptions.corejs;
      }

      allLoaderConfigs
        .filter((loader) => {
          return loader.test instanceof RegExp && loader.test.test('.tsx');
        })
        .forEach((loader) => {
          const babelLoader = loader.use.find((l) => {
            return findResolved(l.loader, 'babel-loader');
          });

          if (babelLoader) {
            babelLoader.options = {
              ...babelLoader.options,
              presets: [],
              plugins: [
                // eslint-disable-next-line node/no-extraneous-require
                require.resolve('hops-react/lib/babel'),
              ],
            };
          }
        });
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

module.exports = WebpackOptimizationsMixin;
