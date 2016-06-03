
var WebpackConfigEnvironment = require('webpack-config').ConfigEnvironment;
var WebpackConfig = require('webpack-config').Config;

var config = require('../lib/config');

WebpackConfigEnvironment.INSTANCE.setAll({
  hopsConfig: function () {
    var env = process.env.WEBPACK_ENV || process.env.NODE_ENV;
    return (env === 'production') ? config.webpackBuild : config.webpackDev;
  }
});

module.exports = new WebpackConfig().extend('[hopsConfig]').merge({
  filename: __filename
});
