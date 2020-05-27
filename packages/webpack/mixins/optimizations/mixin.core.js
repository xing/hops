const { Mixin } = require('hops-bootstrap');

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
      jsLoaderConfig.exclude = [/node_modules\//];

      const presetEnv = jsLoaderConfig.options.presets.find((preset) => {
        return findResolved(preset[0], '@babel/preset-env');
      });

      if (presetEnv) {
        presetEnv[1].useBuiltIns = false;
        delete presetEnv[1].corejs;
      }

      webpackConfig.entry = []
        .concat(webpackConfig.entry)
        .filter(
          (entry) => /(core-js|regenerator-runtime)/.test(entry) == false
        );

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
