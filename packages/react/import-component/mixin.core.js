const { Mixin } = require('hops-mixin');

class ImportComponentCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    const { experimentalEsbuild } = this.options;

    if (experimentalEsbuild) {
      jsLoaderConfig.use.push({
        loader: require.resolve('./import-component-loader.js'),
        options: { module: 'hops', rootDir: this.config.rootDir },
      });
    } else {
      jsLoaderConfig.options.plugins.push([
        require.resolve('../lib/babel'),
        { module: 'hops', rootDir: this.config.rootDir },
      ]);
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

module.exports = ImportComponentCoreMixin;
