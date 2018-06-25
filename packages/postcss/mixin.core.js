const postcssImportPlugin = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const ExtractCSSPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const { Mixin } = require('@untool/core');
const {
  uri: { resolveRelative },
} = require('@untool/express');

const cssLoaderOptions = {
  camelCase: true,
  modules: true,
  localIdentName: '[folder]-[name]-[local]-[hash:8]',
  sourceMap: process.env.NODE_ENV !== 'production',
};

const getCSSLoaderConfig = browsers => ({
  test: [/\.css$/],
  use: [
    {
      loader: require.resolve('css-loader'),
      options: {
        ...cssLoaderOptions,
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: [
          postcssImportPlugin(),
          postcssPresetEnv({
            browsers,
          }),
        ],
      },
    },
  ],
});

class PostCSSMixin extends Mixin {
  configureBuild(webpackConfig, loaderConfigs, target) {
    switch (target) {
      case 'build':
        this.configureTargetBuild(webpackConfig, loaderConfigs);
        break;
      case 'develop':
        this.configureTargetDevelop(loaderConfigs);
        break;
      case 'node':
        this.configureTargetNode(loaderConfigs);
        break;
    }
    return webpackConfig;
  }

  configureTargetBuild(webpackConfig, { allLoaderConfigs, jsLoaderConfig }) {
    const loaderConfig = {
      ...getCSSLoaderConfig(this.config.browsers),
      use: [
        ExtractCSSPlugin.loader,
        ...getCSSLoaderConfig(this.config.browsers).use,
      ],
    };

    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      loaderConfig
    );

    webpackConfig.plugins.push(
      new ExtractCSSPlugin({
        filename: resolveRelative(
          this.config.assetPath,
          '[name]-[contenthash:12].css'
        ),
        chunkFilename: resolveRelative(
          this.config.assetPath,
          '[name]-[contenthash:12].css'
        ),
      })
    );

    webpackConfig.optimization.minimizer.push(
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          reduceIdents: { disable: true },
          zindex: { disable: true },
          mergeIdents: { disable: true },
          discardUnused: { disable: true },
        },
      })
    );
  }

  configureTargetDevelop({ allLoaderConfigs, jsLoaderConfig }) {
    const loaderConfig = {
      ...getCSSLoaderConfig(this.config.browsers),
      use: [
        require.resolve('style-loader'),
        ...getCSSLoaderConfig(this.config.browsers).use,
      ],
    };

    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      loaderConfig
    );
  }

  configureTargetNode({ allLoaderConfigs, jsLoaderConfig }) {
    const cssLoaderConfig = {
      test: [/\.css$/],
      loader: require.resolve('css-loader/locals'),
      options: cssLoaderOptions,
    };

    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      cssLoaderConfig
    );
  }
}

module.exports = PostCSSMixin;
