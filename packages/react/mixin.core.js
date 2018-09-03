const { Mixin } = require('hops-mixin');

class ReactCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push(
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-proposal-object-rest-spread')
    );

    return webpackConfig;
  }
}

module.exports = ReactCoreMixin;
