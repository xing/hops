const { Mixin } = require('hops-mixin');

const getPluginDetails = plugin => {
  return typeof plugin === 'string' ? [plugin] : plugin;
};

const findPlugin = needle => {
  return plugin => {
    const [pluginName] = getPluginDetails(plugin);
    return require.resolve(pluginName) === require.resolve(needle);
  };
};

class TypescriptMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }) {
    webpackConfig.resolve.extensions.unshift('.ts', '.tsx');

    jsLoaderConfig.test.push(/\.tsx?$/);

    const { presets, plugins } = jsLoaderConfig.options;

    const typescript = require.resolve('@babel/preset-typescript');

    const flowIndex = presets.find(findPlugin('@babel/preset-flow'));

    if (flowIndex > -1) {
      presets.splice(flowIndex, 1, typescript);
    } else {
      presets.push(typescript);
    }

    const classPropertiesIndex = plugins.find(
      '@babel/plugin-proposal-class-properties'
    );

    const decorators = [
      require.resolve('@babel/plugin-proposal-decorators'),
      { legacy: true },
    ];

    const classProperties = [
      require.resolve('@babel/plugin-proposal-class-properties'),
      { ...getPluginDetails(plugins[classPropertiesIndex]), loose: true },
    ];

    if (classPropertiesIndex > -1) {
      plugins.splice(classPropertiesIndex, 1, decorators, classProperties);
    } else {
      plugins.push(decorators);
    }

    return webpackConfig;
  }
}

module.exports = TypescriptMixin;
