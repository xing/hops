const { Mixin } = require('hops-mixin');

class StyledComponentsMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }, target) {
    jsLoaderConfig.options.plugins.unshift([
      require.resolve('babel-plugin-styled-components'),
      {
        ssr: true,
        pure: true,
        displayName: target !== 'build',
        fileName: target !== 'build',
      },
    ]);
  }
}

module.exports = StyledComponentsMixin;
