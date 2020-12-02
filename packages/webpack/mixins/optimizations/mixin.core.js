const minimatch = require('minimatch');
const { Mixin } = require('hops-mixin');

function include(patterns) {
  return (path) =>
    // allow everything outside of node_modules
    !path.includes('node_modules') ||
    // allow all hops packages
    /node_modules[/\\]hops/.test(path) ||
    // check if any other rule matches
    patterns.some((rule) => minimatch(path, rule));
}

function unique(value, index, self) {
  return self.indexOf(value) === index;
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
    const { fastBuild: fastBuildFlag, fastDev: fastDevFlag } = this.options;
    const { NODE_ENV } = process.env;
    const fastBuild =
      fastBuildFlag && (target === 'build' || target === 'node');
    const fastDev =
      fastDevFlag &&
      NODE_ENV !== 'production' &&
      (target === 'develop' || target === 'node');

    const [, presetEnvOptions] =
      jsLoaderConfig.options.presets
        .filter(Array.isArray)
        .find(([path]) => findResolved(path, '@babel/preset-env')) || [];

    if (fastBuild || fastDev) {
      // do not transpile node_modules for either fastBuild or fastDev
      const { experimental: { babelIncludePatterns = [] } = {} } = this.config;
      jsLoaderConfig.include = include(babelIncludePatterns);
      jsLoaderConfig.exclude = [];

      // always add "regenerator-runtime/runtime" because babel will still down-
      // transpile async functions if the browserslist requires it
      webpackConfig.entry = [require.resolve('regenerator-runtime/runtime')]
        .concat(webpackConfig.entry)
        .filter(unique);

      // if we use TypeScript we only need to transpile `importComponent`
      allLoaderConfigs
        .filter((loader) => {
          return loader.test instanceof RegExp && loader.test.test('.tsx');
        })
        .forEach((loader) => {
          const babelLoader = loader.use.find(({ loader }) => {
            return findResolved(loader, 'babel-loader');
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

    if (fastBuild) {
      // in fastBuild mode we want to play it safe and still include all
      // necessary polyfills
      presetEnvOptions.useBuiltIns = 'entry';

      webpackConfig.entry = [require.resolve('core-js/stable')]
        .concat(webpackConfig.entry)
        .filter(unique);
    }

    if (fastDev) {
      // in fastDev mode we don't want to include any polyfills, because we
      // assume that developers are using modern browsers
      presetEnvOptions.useBuiltIns = false;
      presetEnvOptions.corejs = undefined;
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

module.exports = WebpackOptimizationsMixin;
