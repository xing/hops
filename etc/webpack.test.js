
var helpers = require('../plugin/helpers');

module.exports = helpers.extendConfig(
  helpers.resolve('webpack.node.js'),
  {
    filename: __filename,
    output: {
      library: false
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
      ]
    }
  }
);
