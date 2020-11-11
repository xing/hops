const { Mixin } = require('hops-mixin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

class ReactFastRefreshMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }, target) {
    const { fastRefresh: fastRefreshFlag } = this.options;

    const { NODE_ENV } = process.env;
    const fastRefresh =
      fastRefreshFlag && NODE_ENV !== 'production' && target === 'develop';

    if (fastRefresh) {
      jsLoaderConfig.options.plugins.push(
        require.resolve('react-refresh/babel')
      );

      webpackConfig.plugins.push(
        new ReactRefreshWebpackPlugin({
          overlay: {
            sockIntegration: 'whm',
          },
        })
      );
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }

  configureCommand(definition) {
    if (definition.command === 'start') {
      definition.builder.fastRefresh = {
        default: false,
        describe:
          'Experimental: Enable instant feedback for changes in your React components',
        type: 'boolean',
      };
    }
  }
}

module.exports = ReactFastRefreshMixin;
