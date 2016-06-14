
var helpers = require('../plugin/helpers');

module.exports = helpers.extendConfig(
  helpers.transform(
    'webpack.node.js',
    function (config) {
      config.module.loaders = config.module.loaders.filter(
        function (loader) {
          var json = JSON.stringify(loader);
          return (json.search(/"babel(?=(?:-loader(?:\?|"))|\?|")/) === -1);
        }
      );
      return config;
    }
  ),
  {
    filename: __filename,
    output: {
      library: false
    },
    module: {
      preLoaders: [{
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: 'stylelint',
        exclude: /node_modules/
      }],
      loaders: [{
        test: /^.*\.test\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules\//
      }, {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          cacheDirectory: false,
          plugins: [
            ['__coverage__', { only: 'src/**/*.js'}],
            'typecheck'
          ]
        },
        exclude: [/node_modules\//, /^.*\.test\.jsx?$/]
      }]
    }
  }
);
