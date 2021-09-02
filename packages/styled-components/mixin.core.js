const { Mixin } = require('hops-mixin');

class StyledComponentsMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }, target) {
    const { experimentalEsbuild } = this.options;

    if (experimentalEsbuild) {
      if (typeof this.getLogger === 'function') {
        this.getLogger().warn(
          'The experimental esbuild transpilation does not support styled components yet!'
        );
      }
      return;
    }

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

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

module.exports = StyledComponentsMixin;
