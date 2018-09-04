const { Mixin } = require('hops-mixin');

class TypescriptMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    webpackConfig.resolve.extensions.unshift('.ts', '.tsx');
    jsLoaderConfig.test.push(/\.tsx?$/);
    jsLoaderConfig.options.presets.push(
      require.resolve('@babel/preset-typescript')
    );

    return webpackConfig;
  }
}

module.exports = TypescriptMixin;
