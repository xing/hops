const { dirname, relative } = require('path');
const { EnvironmentPlugin, DefinePlugin, ids } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { join, trimSlashes } = require('pathifist');
const getModules = require('../utils/modules');

const { NamedModuleIdsPlugin } = ids;

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
    type: 'asset/resource',
    generator: {
      filename: getAssetPath('[name]-[contenthash:16][ext]'),
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
    // invalid for webpack, needed for hops mixings
    loaderConfigs: {
      jsLoaderConfig,
      urlLoaderConfig,
      fileLoaderConfig,
      allLoaderConfigs,
    },
    name,
    target: ['web', 'es5'],
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
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename].concat(buildDependencies),
      },
    },
    snapshot: {
      buildDependencies: {
        hash: true,
        timestamp: false,
      },
    },
    resolve: {
      modules: getModules(config.rootDir),
      alias: {
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
      },
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            output: { comments: false },
          },
        }),
      ],
      chunkIds: 'natural',
      usedExports: true,
      concatenateModules: true,
    },
    plugins: [
      new NamedModuleIdsPlugin(),
      // Needed for bootstrap/lib/utils#environmentalize, which falls
      // back to `process.env` if there's no global variable `_env`
      new DefinePlugin({ 'process.env': JSON.stringify({}) }),
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
