const { Mixin } = require('hops-mixin');

const getPluginName = (plugin) => (Array.isArray(plugin) ? plugin[0] : plugin);
const getPluginConfig = (plugin) => (Array.isArray(plugin) ? plugin[1] : {});
const isBabelPlugin = (name) => (plugin) =>
  require.resolve(getPluginName(plugin)) === require.resolve(name);

class ReactCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push(
      require.resolve('@babel/plugin-transform-flow-strip-types'),
      require.resolve('@babel/plugin-proposal-class-properties')
    );

    const untoolPluginIndex = jsLoaderConfig.options.plugins.findIndex(
      isBabelPlugin('@untool/react/lib/babel')
    );

    const untoolPlugin = jsLoaderConfig.options.plugins[untoolPluginIndex];

    jsLoaderConfig.options.plugins[untoolPluginIndex] = [
      require.resolve('@untool/react/lib/babel'),
      {
        ...getPluginConfig(untoolPlugin),
        module: 'hops',
      },
    ];
  }
}

module.exports = ReactCoreMixin;
