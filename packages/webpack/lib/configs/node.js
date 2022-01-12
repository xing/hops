const { dirname, resolve } = require('path');
const {
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  HashedModuleIdsPlugin,
  NamedModulesPlugin,
  optimize,
} = require('webpack');
const { join, trimSlashes } = require('pathifist');
const getModules = require('../utils/modules');

const { LimitChunkCountPlugin } = optimize;

module.exports = function getConfig(config, name) {
  const getAssetPath = (...arg) => trimSlashes(join(config.assetPath, ...arg));
  const isProduction = process.env.NODE_ENV === 'production';

  const jsLoaderConfig = {
    test: [/\.m?js$/],
    // eslint-disable-next-line no-useless-escape
    exclude: [/node_modules[\/\\](webpack[\/\\]buildin|core-js)/],
    loader: require.resolve('babel-loader'),
    options: {
      babelrc: false,
      compact: isProduction,
      cacheDirectory: true,
      cacheIdentifier: `${process.env.NODE_ENV || 'development'}:${name}:${
        process.versions.node
      }`,
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            modules: false,
            useBuiltIns: 'entry',
            targets: { node: config.node },
            corejs: 3,
            include: [
              '@babel/proposal-optional-chaining',
              '@babel/proposal-nullish-coalescing-operator',
            ],
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
      emitFile: false,
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
          emitFile: false,
          esModule: false,
        },
      },
    ],
  };

  const allLoaderConfigs = [jsLoaderConfig, urlLoaderConfig, fileLoaderConfig];

  return {
    // invalid for webpack, required with hops mixins
    loaderConfigs: {
      jsLoaderConfig,
      urlLoaderConfig,
      fileLoaderConfig,
      allLoaderConfigs,
    },
    name,
    target: 'async-node',
    mode: isProduction ? 'production' : 'development',
    bail: isProduction,
    context: config.rootDir,
    entry: [
      ...(isProduction
        ? []
        : [require.resolve('webpack/hot/signal') + '?RELOAD']),
      require.resolve('core-js/stable'),
      require.resolve('../shims/node'),
    ],
    output: {
      path: config.serverDir,
      publicPath: '/',
      pathinfo: true,
      filename: config.serverFile,
      libraryTarget: 'commonjs2',
      devtoolModuleFilenameTemplate: (info) =>
        resolve(info.absoluteResourcePath),
    },
    resolve: {
      modules: getModules(config.rootDir),
      alias: {
        'hops/entrypoint': config.rootDir,
        'core-js': dirname(require.resolve('core-js/package.json')),
      },
      extensions: ['.mjs', '.js'],
      mainFields: [
        'esnext:server',
        'jsnext:server',
        'server',
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
      minimizer: [],
    },
    plugins: [
      new LimitChunkCountPlugin({ maxChunks: 1 }),
      new (isProduction ? HashedModuleIdsPlugin : NamedModulesPlugin)(),
      isProduction ? { apply: () => {} } : new HotModuleReplacementPlugin(),
      new EnvironmentPlugin({ NODE_ENV: 'development' }),
    ],
    performance: {
      hints: false,
      maxEntrypointSize: 52428800,
      maxAssetSize: 52428800,
    },
    devtool: 'source-map',
    watchOptions: { aggregateTimeout: 300, ignored: /node_modules/ },
  };
};
