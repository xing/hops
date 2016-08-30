#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');

var webpack = require('webpack');
var appRoot = require('app-root-path');

/** @ignore */
function fileExists(filePath) {
  try { fs.accessSync(filePath, fs.F_OK); return true; }
  catch (e) { return false; }
}

/** @ignore */
function requireConfig(fileName) {
  var filePath = fileName;
  if (!path.isAbsolute(filePath) || !fileExists(filePath)) {
    filePath = appRoot.resolve(fileName);
    if (!fileExists(filePath)) {
      try { filePath = require.resolve('malt-config/' + fileName); }
      catch (e) { filePath = null; }
    }
    if (!fileExists(filePath)) {
      filePath = path.resolve(__dirname, '..', 'etc', fileName);
    }
  }
  return require(filePath);
}

/** @ignore */
function build() {}

/** @ignore */
function serve() {
  var Server = require('webpack-dev-server/lib/Server');
  var webpackConfig = requireConfig('webpack.serve.js');
  var options = webpackConfig.devServer || {};
  var server = new Server(webpack(webpackConfig), options);
  server.listen(options.port, options.host, function(err) {
    if (err) { throw err; }
    console.log(url.format({ // eslint-disable-line no-console
      protocol: options.https ? 'https' : 'http',
      host: options.host,
      port: options.port
    }));
  });
}

/** @ignore */
function runTests() {
  var parseArgv = require('mocha-webpack/lib/cli/parseArgv').default;
  var prepareWebpack = require('mocha-webpack/lib/cli/prepareWebpack').default;
  var runner = require('mocha-webpack/lib/cli/runner');
  var options = Object.assign(
    parseArgv(),
    {
      reporter: 'hops/reporter',
      require: ['source-map-support/register'],
      webpackConfig: requireConfig('webpack.test.js'),
      files: ['src/**/*.test.js*']
    },
    (appRoot.require('package.json').hops || {}).mocha,
    parseArgv(process.argv.slice(3), true)
  );
  options.webpackConfig = require('../etc/webpack.test.js');
  prepareWebpack(options, function (err, webpackConfig) {
    if (err) {
      throw err;
    } else if (options.watch) {
      runner.watch(options, webpackConfig);
    } else {
      runner.run(options, webpackConfig);
    }
  });
}

/** @ignore */
function start() {
  return (process.env.NODE_ENV === 'production') ? build() : serve();
}

switch (process.argv[2]) {
  case 'build': return build();
  case 'serve': return serve();
  case 'test': return runTests();
  default: return start();
}
