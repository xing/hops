'use strict';

var url = require('url');

var webpack = require('webpack');
var appRoot = require('app-root-path');
var Server = require('webpack-dev-server');

var util = require('./index');

var webpackConfig = util.requireConfig('webpack.serve.js');

var options = Object.assign(
  {},
  {
    hot: true,
    inline: true,
    contentBase: appRoot.resolve('dist'),
    publicPath: webpackConfig.output.publicPath,
    host: '0.0.0.0',
    port: 8080,
    noInfo: true,
    stats: 'errors-only'
  },
  util.config.devServer,
  webpackConfig.devServer
);

var server = new Server(webpack(webpackConfig), options);

server.listen(options.port, options.host, function(err) {
  if (err) { throw err; }
  console.log(url.format({ // eslint-disable-line no-console
    protocol: options.https ? 'https' : 'http',
    hostname: options.host,
    port: options.port
  }));
});
