const { Mixin } = require('hops-mixin');

class ImportComponentCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push([
      require.resolve('../lib/babel'),
      { module: 'hops' },
    ]);
  }
}

module.exports = ImportComponentCoreMixin;
