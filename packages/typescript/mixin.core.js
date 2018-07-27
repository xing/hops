const { Mixin } = require('hops-mixin');

class TypescriptMixin extends Mixin {
  configureBuild(webpackConfig, { allLoaderConfigs }) {
    webpackConfig.resolve.extensions.unshift('.ts', '.tsx');

    allLoaderConfigs.unshift({
      test: /\.tsx?$/,
      use: [{ loader: require.resolve('ts-loader') }],
    });

    return webpackConfig;
  }
}

module.exports = TypescriptMixin;
