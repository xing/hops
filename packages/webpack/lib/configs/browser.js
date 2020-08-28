const { dirname, relative } = require('path');
const {
  EnvironmentPlugin,
  HashedModuleIdsPlugin,
  NamedModulesPlugin,
  optimize,
} = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { join, trimSlashes } = require('pathifist');
const getModules = require('../utils/modules');

const { ModuleConcatenationPlugin } = optimize;

module.exports = function getConfig(config, name, isProduction) {
  const getAssetPath = (...arg) => trimSlashes(join(config.assetPath, ...arg));

  const jsLoaderConfig = {
    test: [/\.m?js$/],
    // eslint-disable-next-line no-useless-escape
    exclude: [/node_modules[\/\\](webpack[\/\\]buildin|core-js)/],
    loader: require.resolve('babel-loader'),
    options: {
      babelrc: false,
      compact: isProduction,
      cacheDirectory: true,
      cacheIdentifier: `${process.env.NODE_ENV || 'development'}:${name}`,
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            modules: false,
            useBuiltIns: 'usage',
            targets: { browsers: config.browsers },
            corejs: 3,
            include: [],
            exclude: [],
          },
        ],
      ],
      plugins: [],
      sourceType: 'unambiguous',
    },
  };

  const fileLoaderConfig = {
    exclude: [/\.(?:m?js|html|json)$/],
    loader: require.resolve('file-loader'),
    options: {
      name: getAssetPath('[name]-[hash:16].[ext]'),
      esModule: false,
    },
  };

  const urlLoaderConfig = {
    test: [/\.(png|gif|jpe?g|webp)$/],
    oneOf: [
      {
        resourceQuery: /noinline/,
        ...fileLoaderConfig,
      },
      {
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: getAssetPath('[name]-[hash:16].[ext]'),
          esModule: false,
        },
      },
    ],
  };

  const allLoaderConfigs = [jsLoaderConfig, urlLoaderConfig, fileLoaderConfig];

  return {
    // invalid for webpack, needed for hops mixins
    loaderConfigs: {
      jsLoaderConfig,
      urlLoaderConfig,
      fileLoaderConfig,
      allLoaderConfigs,
    },
    name,
    mode: isProduction ? 'production' : 'development',
    bail: isProduction,
    context: config.rootDir,
    entry: require.resolve('../shims/build'),
    output: {
      path: config.buildDir,
      publicPath: '/',
      pathinfo: true,
      filename: getAssetPath(`${config.name}-[chunkhash:12].js`),
      chunkFilename: getAssetPath(`${config.name}-[id]-[chunkhash:12].js`),
      devtoolModuleFilenameTemplate: (info) =>
        relative(config.rootDir, info.absoluteResourcePath),
    },
    resolve: {
      modules: getModules(config.rootDir),
      alias: {
        // todo: remove this if not used anymore
        '@untool/entrypoint': config.rootDir,
        'hops/entrypoint': config.rootDir,
        'regenerator-runtime': dirname(
          require.resolve('regenerator-runtime/package.json')
        ),
        'core-js': dirname(require.resolve('core-js/package.json')),
      },
      extensions: ['.mjs', '.js'],
      mainFields: [
        'esnext:browser',
        'jsnext:browser',
        'browser',
        'module',
        'esnext',
        'jsnext',
        'esnext:main',
        'jsnext:main',
        'main',
      ],
    },
    module: {
      rules: [{ oneOf: allLoaderConfigs }],
    },
    externals: [],
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            output: { comments: false },
          },
        }),
      ],
    },
    plugins: [
      new (isProduction ? HashedModuleIdsPlugin : NamedModulesPlugin)(),
      new ModuleConcatenationPlugin(),
      new EnvironmentPlugin({ NODE_ENV: 'development' }),
    ],
    performance: {
      hints: false,
      maxEntrypointSize: 262144,
      maxAssetSize: 262144,
    },
    devtool: 'hidden-source-map',
  };
};
