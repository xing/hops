const { Mixin } = require('hops-mixin');

module.exports = class AnalyzerCoreMixin extends Mixin {
  configureCommand(definition) {
    if (definition.command === 'build') {
      definition.builder.analyzeClientBundle = {
        type: 'boolean',
        default: false,
        describe:
          'Start an HTTP server displaying a bundle report visualization of client side build',
      };
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };

    if (
      this.options.parallelBuild === true &&
      this.options.analyzeClientBundle === true &&
      typeof this.getLogger === 'function'
    ) {
      this.getLogger().warn(
        `Disabling parallel-build feature; otherwise can't analyze client bundle.`
      );
    }
  }

  allowForkBuild(options) {
    return (
      options.analyzeClientBundle === false && options.parallelBuild === true
    );
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

    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      })
    );
  }
};
