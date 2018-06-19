const { Mixin } = require('@untool/core');

class ReactCoreMixin extends Mixin {
  configureWebpack(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push(
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-object-rest-spread')
    );

    return webpackConfig;
  }
}

module.exports = ReactCoreMixin;
