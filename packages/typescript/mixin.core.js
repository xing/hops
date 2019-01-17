const { Mixin } = require('hops-mixin');

class TypescriptMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.test = [/\.tsx?$/];
    jsLoaderConfig.use = [
      {
        loader: jsLoaderConfig.loader,
        options: { ...jsLoaderConfig.options },
      },
      {
        loader: require.resolve('ts-loader'),
      },
    ];
    delete jsLoaderConfig.loader;
    delete jsLoaderConfig.options;

    webpackConfig.resolve.extensions.push('.ts', '.tsx');
  }
}

module.exports = TypescriptMixin;
