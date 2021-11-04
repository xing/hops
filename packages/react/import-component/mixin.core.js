const { Mixin } = require('hops-mixin');

class ImportComponentCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    const { experimentalEsbuild } = this.options;

    if (experimentalEsbuild) {
      jsLoaderConfig.use.push(require.resolve('./swc-loader.js'));
    } else {
      jsLoaderConfig.options.plugins.push([
        require.resolve('../lib/babel'),
        { module: 'hops' },
      ]);
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

module.exports = ImportComponentCoreMixin;
