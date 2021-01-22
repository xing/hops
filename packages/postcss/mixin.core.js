const postcssImportPlugin = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalizeCharset = require('postcss-normalize-charset');
const ExtractCSSPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const { Mixin } = require('hops-mixin');
const { join, trimSlashes } = require('pathifist');

const getAssetPath = (...args) => trimSlashes(join(...args));

const getCssLoaderLocalOptions = (namedExport) => ({
  modules: {
    auto: () => true,
    localIdentName: '[folder]-[name]-[local]-[hash:8]',
    exportLocalsConvention: namedExport ? 'camelCaseOnly' : 'camelCase',
    namedExport,
  },
  sourceMap: process.env.NODE_ENV !== 'production',
});

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

const getCSSLoaderConfig = (browsers, namedExport, additionalLoader) => {
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
        use: getLoaders(getCssLoaderLocalOptions(namedExport)),
      },
    ],
  };
};

class PostCSSMixin extends Mixin {
  configureBuild(webpackConfig, loaderConfigs, target) {
    const { namedExport } = this.config.postcss;

    switch (target) {
      case 'build':
        this.configureTargetBuild(webpackConfig, loaderConfigs, namedExport);
        break;
      case 'develop':
        this.configureTargetDevelop(loaderConfigs, namedExport);
        break;
      case 'node':
        this.configureTargetNode(loaderConfigs, namedExport);
        break;
    }
  }

  configureTargetBuild(
    webpackConfig,
    { allLoaderConfigs, jsLoaderConfig },
    namedExport
  ) {
    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      getCSSLoaderConfig(this.config.browsers, namedExport, {
        loader: ExtractCSSPlugin.loader,
        options: {
          modules: { namedExport },
        },
      })
    );

    webpackConfig.plugins.push(
      new ExtractCSSPlugin({
        filename: getAssetPath(
          this.config.assetPath,
          '[name]-[contenthash:12].css'
        ),
        chunkFilename: getAssetPath(
          this.config.assetPath,
          '[name]-[contenthash:12].css'
        ),
        ignoreOrder: true,
      })
    );

    webpackConfig.optimization.minimizer.push(
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          reduceIdents: { disable: true },
          zindex: { disable: true },
          mergeIdents: { disable: true },
          discardUnused: { disable: true },
          autoprefixer: { disable: true },
        },
      })
    );
  }

  configureTargetDevelop({ allLoaderConfigs, jsLoaderConfig }, namedExport) {
    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      getCSSLoaderConfig(this.config.browsers, namedExport, {
        loader: require.resolve('style-loader'),
        options: {
          modules: { namedExport },
        },
      })
    );
  }

  configureTargetNode({ allLoaderConfigs, jsLoaderConfig }, namedExport) {
    const cssLoaderLocalOptions = getCssLoaderLocalOptions(namedExport);

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
