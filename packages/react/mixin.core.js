const { Mixin } = require('@untool/core');

class ReactCoreMixin extends Mixin {
  configureWebpack(webpackConfig, { jsLoaderConfig }) {
    jsLoaderConfig.options.plugins.push(
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-object-rest-spread')
    );

    // TODO: this does not actually work because the webpack browser process
    // shim also includes other properties, such as `nextTick`, `cwd` and such
    webpackConfig.node = {
      process: false,
    };

    return webpackConfig;
  }

  handleArguments(argv) {
    global._hopsCLIArguments = Object.assign({}, argv, { $0: 'hops' });
  }
}

module.exports = ReactCoreMixin;
