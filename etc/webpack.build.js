
var webpack = require('webpack');
var WebpackConfig = require('webpack-config').default;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('../lib/config');

var modifiedBaseConfig = {};
modifiedBaseConfig[config.webpackBase] = function (baseConfig) {
  baseConfig.module.loaders = baseConfig.module.loaders.filter(
    function (loader) {
      var json = JSON.stringify(loader);
      return (json.search(/"css(?=(?:-loader(?:\?|"))|\?|")/) === -1);
    }
  );
  delete baseConfig.devtool;
  return baseConfig;
};

module.exports = new WebpackConfig().extend(modifiedBaseConfig).merge({
  filename: __filename,
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-addons-update',
      'react-router',
      'react-router-redux',
      'react-redux',
      'redux',
      'redux-thunk'
    ],
    bundle: require.resolve('../shims/browser')
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'stylelint',
        exclude: /node_modules/
      }
    ],
    loaders: {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&localIdentName=[name]-[local]-[hash:base64:5]&importLoaders=1!postcss'
      )
    }
  },
  eslint: {
    configFile: config.eslint
  },
  stylelint: {
    configFile: config.stylelint
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      minimize: true,
      debug: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    new ExtractTextPlugin('bundle.css')
  ]
});
