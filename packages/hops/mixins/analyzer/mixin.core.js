const { Mixin } = require('hops-mixin');

module.exports = class AnalyzerCoreMixin extends Mixin {
  configureCommand(definition) {
    if (definition.command === 'build') {
      definition.builder.analyzeClientBundle = {
        type: 'boolean',
        default: false,
        describe: 'Opens webpack bundle analyzer page after client side build',
      };
    }
  }
  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
  configureBuild(webpackConfig, loaderConfigs, target) {
    if (
      !['build', 'develop'].includes(target) ||
      !this.options.analyzeClientBundle
    ) {
      return;
    }
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin;

    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  }
};
