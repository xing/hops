'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var WriteFilePlugin = require('../lib/write-file');
var hopsConfig = require('..');

var getAssetPath = path.join.bind(path, hopsConfig.assetPath);

var defaultHttpsConfig = {
  key: path.join(__dirname, '..', 'ssl', 'localhost.ssl.key'),
  cert: path.join(__dirname, '..', 'ssl', 'localhost.ssl.crt'),
  ca: path.join(__dirname, '..', 'ssl', 'rootca.pem')
};

function getFileContentsForPath (obj, key) {
  if (typeof obj[key] === 'string') {
    return fs.readFileSync(path.resolve(obj[key]));
  }
  return obj[key];
}

function getHttpsConfig (hopsConfig) {
  if (!hopsConfig.https) {
    return false;
  }

  var config =
    typeof hopsConfig.https === 'object'
      ? hopsConfig.https
      : defaultHttpsConfig;

  return {
    key: getFileContentsForPath(config, 'key'),
    cert: getFileContentsForPath(config, 'cert'),
    ca: getFileContentsForPath(config, 'ca')
  };
}

module.exports = {
  entry: [
    'webpack-dev-server/client?' + url.format({
      protocol: hopsConfig.https ? 'https' : 'http',
      hostname: hopsConfig.host,
      port: hopsConfig.port
    }),
    'webpack/hot/dev-server',
    require.resolve('../shims/develop')
  ],
  output: {
    path: hopsConfig.buildDir,
    publicPath: '/',
    filename: getAssetPath('[name].js'),
    chunkFilename: getAssetPath('chunk-[id].js')
  },
  context: hopsConfig.appDir,
  resolve: require('../sections/resolve')('develop'),
  module: {
    rules: require('../sections/module-rules')('develop')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ManifestPlugin({
      publicPath: '/'
    }),
    new WriteFilePlugin(/^manifest\.js(on)?$/),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  performance: {
    hints: false
  },
  devtool: '#source-map',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/
  },
  devServer: {
    contentBase: hopsConfig.buildDir,
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    },
    stats: 'errors-only',
    https: getHttpsConfig(hopsConfig)
  }
};
