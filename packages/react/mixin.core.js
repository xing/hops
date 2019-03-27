const { Mixin } = require('hops-mixin');
const {
  internal: { babelPlugin },
} = require('untool');

const getPluginName = plugin => (Array.isArray(plugin) ? plugin[0] : plugin);
const getPluginConfig = plugin => (Array.isArray(plugin) ? plugin[1] : {});
const isBabelPlugin = path => plugin =>
  require.resolve(getPluginName(plugin)) === path;

class ReactCoreMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push(
      require.resolve('@babel/plugin-transform-flow-strip-types'),
      require.resolve('@babel/plugin-proposal-class-properties')
    );

    const untoolPluginIndex = jsLoaderConfig.options.plugins.findIndex(
      isBabelPlugin(babelPlugin.path)
    );

    const untoolPlugin = jsLoaderConfig.options.plugins[untoolPluginIndex];

    jsLoaderConfig.options.plugins[untoolPluginIndex] = [
      babelPlugin.path,
      {
        ...getPluginConfig(untoolPlugin),
        module: 'hops',
      },
    ];
  }
}

module.exports = ReactCoreMixin;
