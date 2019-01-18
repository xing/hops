const { Mixin } = require('hops-mixin');

class TypescriptMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig, allLoaderConfigs }) {
    const { loader, options, exclude } = jsLoaderConfig;

    allLoaderConfigs.unshift({
      test: /\.tsx?$/,
      exclude,
      use: [
        {
          loader,
          options,
        },
        {
          loader: require.resolve('ts-loader'),
        },
      ],
    });
    webpackConfig.resolve.extensions.push('.ts', '.tsx');
  }
}

module.exports = TypescriptMixin;
