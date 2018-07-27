const { Mixin } = require('hops-mixin');

class StyledComponentsMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }, target) {
    jsLoaderConfig.options.plugins.unshift([
      require.resolve('babel-plugin-styled-components'),
      {
        ssr: true,
        displayName: target !== 'build',
        fileName: target !== 'build',
      },
    ]);

    return webpackConfig;
  }
}

module.exports = StyledComponentsMixin;
