const postcssImportPlugin = require('postcss-import');
const postcssImportResolver = require('postcss-import/lib/resolve-id');
const postcssPresetEnv = require('postcss-preset-env');
const ExtractCSSPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const { Mixin } = require('hops-mixin');
const { join, trimSlashes } = require('pathifist');

const getAssetPath = (...args) => trimSlashes(join(...args));

const cssLoaderLocalOptions = {
  modules: {
    localIdentName: '[folder]-[name]-[local]-[hash:8]',
  },
  localsConvention: 'camelCase',
  sourceMap: process.env.NODE_ENV !== 'production',
};

const cssLoaderGlobalOptions = {
  modules: false,
  sourceMap: process.env.NODE_ENV !== 'production',
};

const getCSSLoaderConfig = (browsers, additionalLoader) => {
  const getLoaders = options =>
    [
      additionalLoader,
      {
        loader: require.resolve('css-loader'),
        options: {
          ...options,
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: [
            postcssImportPlugin({
              resolve: (id, base, options) =>
                postcssImportResolver(
                  id.startsWith('~') ? id.slice(1) : id,
                  base,
                  options
                ),
            }),
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
            }),
          ],
        },
      },
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
      getCSSLoaderConfig(this.config.browsers, ExtractCSSPlugin.loader)
    );

    webpackConfig.plugins.unshift(
      new FilterWarningsPlugin({
        exclude: /\[mini-css-extract-plugin\][^]*Conflicting order between:/,
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

  configureTargetDevelop({ allLoaderConfigs, jsLoaderConfig }) {
    allLoaderConfigs.splice(
      allLoaderConfigs.indexOf(jsLoaderConfig),
      0,
      getCSSLoaderConfig(this.config.browsers, require.resolve('style-loader'))
    );
  }

  configureTargetNode({ allLoaderConfigs, jsLoaderConfig }) {
    const cssLoaderConfig = {
      test: [/\.css$/],
      oneOf: [
        {
          resourceQuery: /global/,
          use: {
            loader: require.resolve('css-loader'),
            options: {
              ...cssLoaderGlobalOptions,
              importLoaders: 0,
              onlyLocals: true,
            },
          },
        },
        {
          use: {
            loader: require.resolve('css-loader'),
            options: {
              ...cssLoaderLocalOptions,
              importLoaders: 0,
              onlyLocals: true,
            },
          },
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
