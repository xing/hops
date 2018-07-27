const { Mixin } = require('hops-mixin');

class ReactCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push(
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-object-rest-spread')
    );

    return webpackConfig;
  }
}

module.exports = ReactCoreMixin;
