const postcssImportPlugin = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalizeCharset = require('postcss-normalize-charset');
const ExtractCSSPlugin = require('mini-css-extract-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { Mixin } = require('hops-mixin');
const { join, trimSlashes } = require('pathifist');

const getAssetPath = (...args) => trimSlashes(join(...args));

const cssLoaderLocalOptions = {
  modules: {
    auto: () => true,
    localIdentName: '[folder]-[name]-[local]-[hash:8]',
    exportLocalsConvention: 'camelCase',
  },
  esModule: false,
  sourceMap: process.env.NODE_ENV !== 'production',
};

const cssLoaderGlobalOptions = {
  modules: false,
  sourceMap: process.env.NODE_ENV !== 'production',
};

const getPostCssLoader = (...additionalPlugins) => ({
  loader: require.resolve('postcss-loader'),
  options: {
    postcssOptions: {
      ident: 'postcss',
      config: false,
      plugins: [
        postcssNormalizeCharset({ add: false }),
        postcssImportPlugin(),
        ...additionalPlugins,
      ],
    },
  },
});

const getCSSLoaderConfig = (browsers, additionalLoader) => {
  const getLoaders = (options) =>
    [
      additionalLoader,
      {
        loader: require.resolve('css-loader'),
        options: {
          ...options,
          importLoaders: 1,
        },
      },
      getPostCssLoader(
        postcssPresetEnv({
          browsers,
          autoprefixer: {
            overrideBrowserslist: browsers,
          },
          stage: 2,
          features: {
            'nesting-rules': true,
            'custom-media-queries': true,
            'custom-properties': {
              preserve: false,
            },
          },
        })
      ),
    ].filter(Boolean);

  return {
    test: [/\.css$/],
    oneOf: [
      {
        resourceQuery: /global/,
        use: getLoaders(cssLoaderGlobalOptions),
      },
      {
        use: getLoaders(cssLoaderLocalOptions),
      },
    ],
  };
};

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
  }

  configureTargetBuild(webpackConfig, { allLoaderConfigs, jsLoaderConfig }) {
    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      getCSSLoaderConfig(this.config.browsers, {
        loader: ExtractCSSPlugin.loader,
        options: { esModule: false },
      })
    );

    webpackConfig.plugins.push(
      new ExtractCSSPlugin({
        filename: getAssetPath(
          this.config.assetPath,
          '[name]-[chunkhash:12].css'
        ),
        chunkFilename: getAssetPath(
          this.config.assetPath,
          '[name]-[chunkhash:12].css'
        ),
        ignoreOrder: true,
      })
    );

    webpackConfig.optimization.minimizer.push(
      new CSSMinimizerPlugin({
        minimizerOptions: {
          reduceIdents: { disable: true },
          zindex: { disable: true },
          mergeIdents: { disable: true },
          discardUnused: { disable: true },
          autoprefixer: { disable: true },
        },
      })
    );
  }

  configureTargetDevelop({ allLoaderConfigs, jsLoaderConfig }) {
    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      getCSSLoaderConfig(this.config.browsers, {
        loader: require.resolve('style-loader'),
        options: {
          esModule: false,
        },
      })
    );
  }

  configureTargetNode({ allLoaderConfigs, jsLoaderConfig }) {
    const cssLoaderConfig = {
      test: [/\.css$/],
      oneOf: [
        {
          resourceQuery: /global/,
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                ...cssLoaderGlobalOptions,
                modules: {
                  auto: false,
                  exportOnlyLocals: true,
                },
                importLoaders: 1,
              },
            },
            getPostCssLoader(),
          ],
        },
        {
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                ...cssLoaderLocalOptions,
                modules: {
                  ...cssLoaderLocalOptions.modules,
                  exportOnlyLocals: true,
                },
                importLoaders: 1,
              },
            },
            getPostCssLoader(),
          ],
        },
      ],
    };

    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      cssLoaderConfig
    );
  }
}

module.exports = PostCSSMixin;
