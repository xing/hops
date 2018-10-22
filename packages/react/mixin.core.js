const { Mixin } = require('hops-mixin');

class ReactCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push(
      require.resolve('@babel/plugin-transform-flow-strip-types'),
      require.resolve('@babel/plugin-proposal-class-properties')
    );

    const untoolImportPluginIndex = jsLoaderConfig.options.plugins.findIndex(
      plugin =>
        require.resolve(plugin) === require.resolve('@untool/react/lib/babel')
    );

    jsLoaderConfig.options.plugins[untoolImportPluginIndex] = [
      jsLoaderConfig.options.plugins[untoolImportPluginIndex],
      { module: 'hops-react' },
    ];
  }
}

module.exports = ReactCoreMixin;
