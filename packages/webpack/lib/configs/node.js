const { dirname, resolve } = require('path');
const {
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  optimize,
} = require('webpack');
const { join, trimSlashes } = require('pathifist');
const getModules = require('../utils/modules');

const { LimitChunkCountPlugin } = optimize;

module.exports = function getConfig(config, name, buildDependencies) {
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
    type: 'asset/resource',
    generator: {
      filename: getAssetPath('[name]-[contenthash:16][ext]'),
      // TODO: comment in next line as soon as webpack@>5.24.4 supports prefetching
      // and we'll have thus updated webpack to the latest version, which supports
      // this option
      // emit: false,
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
        type: 'asset',
        generator: {
          filename: getAssetPath('[name]-[contenthash:16][ext]'),
          // TODO: comment in next line as soon as webpack@>5.24.4 supports prefetching
          // and we'll have thus updated webpack to the latest version, which supports
          // this option
          // emit: false,
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
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
      library: {
        type: 'commonjs2',
      },
      devtoolModuleFilenameTemplate: (info) =>
        resolve(info.absoluteResourcePath),
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename].concat(buildDependencies),
      },
    },
    snapshot: {
      buildDependencies: {
        hash: true,
        timestamp: !isProduction,
      },
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
