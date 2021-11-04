const { Mixin } = require('hops-mixin');

class HopsSWCMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }, target) {
    const { experimentalSWC } = this.options;

    if (!experimentalSWC) {
      return;
    }

    // NOTE: We don't want to ship esbuild, so we just assume it is installed
    // when someone wants to use it.
    // eslint-disable-next-line node/no-missing-require, node/no-extraneous-require
    const { ESBuildMinifyPlugin } = require('esbuild-loader');
    const { test, include, exclude, ...rest } = jsLoaderConfig;
    Object.keys(rest).forEach((key) => delete jsLoaderConfig[key]);
    Object.assign(jsLoaderConfig, {
      test,
      include,
      exclude,
      use: [
        {
          loader: 'swc-loader',
          options: {
            sync: true,
            jsc: {
              target: 'es2015',
              parser: {
                syntax: 'ecmascript',
              },
            },
          },
        },
      ],
    });

    // NOTE: We don't decide here whether to minify or not but instead just
    // override it if someone else has already configured it.
    if (
      Array.isArray(webpackConfig.optimization.minimizer) &&
      webpackConfig.optimization.minimizer.length > 0
    ) {
      webpackConfig.optimization.minimizer = [
        new ESBuildMinifyPlugin({
          target: target === 'node' ? 'node12' : 'es2015',
          minify: true,
          sourcemap: true,
        }),
      ];
    }
  }

  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

module.exports = HopsSWCMixin;
