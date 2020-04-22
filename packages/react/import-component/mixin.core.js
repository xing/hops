const { Mixin } = require('hops-bootstrap');

class ImportComponentCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push([
      require.resolve('../lib/babel'),
      { module: 'hops' },
    ]);
  }
}

module.exports = ImportComponentCoreMixin;
