
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var helpers = require('../plugin/helpers');

module.exports = helpers.extendConfig(
  helpers.transform(
    'webpack.base.js',
    function (config) {
      config.module.loaders = config.module.loaders.filter(
        function (loader) {
          var json = JSON.stringify(loader);
          return (json.search(/"css(?=(?:-loader(?:\?|"))|\?|")/) === -1);
        }
      );
      return config;
    }
  ),
  {
    filename: __filename,
    entry: {
      vendor: 'hops',
      main: helpers.root
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
    plugins: [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name]-[hash].js'
      }),
      new ExtractTextPlugin(
        '[name]-[contenthash].css',
        { allChunks: true }
      )
    ]
  }
);
