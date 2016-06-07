
var WebpackConfig = require('webpack-config').Config;

var config = require('../lib/config');

var isProd = (process.env.NODE_ENV === 'production');
var base = isProd ? config.webpackBuild : config.webpackDev;

module.exports = new WebpackConfig().extend(base).merge({
  filename: __filename
});
