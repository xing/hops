#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
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
  return Object.assign({}, require(filePath));
}

/** @ignore */
function build() {
  var webpackConfig = requireConfig('webpack.build.js');
  webpack(webpackConfig).run(function(error, stats) {
    // eslint-disable-next-line no-console
    if (error) { console.log(error); }
    // eslint-disable-next-line no-console
    else { console.log(stats.toString({ chunks: false })); }
  });
}

/** @ignore */
function watch() {
  var webpackConfig = requireConfig('webpack.watch.js');
  webpack(webpackConfig).watch({}, function(error) {
    // eslint-disable-next-line no-console
    if (error) { console.log(error); }
  });
}

/** @ignore */
function serve() {
  var Server = require('webpack-dev-server');
  var webpackConfig = requireConfig('webpack.serve.js');
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
    (appRoot.require('package.json').hops || {}).server,
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
}

/** @ignore */
function test() {
  var parseArgv = require('mocha-webpack/lib/cli/parseArgv').default;
  var prepareWebpack = require('mocha-webpack/lib/cli/prepareWebpack').default;
  var runner = require('mocha-webpack/lib/cli/runner');
  var webpackConfig = requireConfig('webpack.test.js');
  var options = Object.assign(
    parseArgv(),
    {
      reporter: 'hops/reporter',
      require: ['source-map-support/register'],
      webpackConfig: webpackConfig,
      files: ['src/**/*.test.js*']
    },
    (appRoot.require('package.json').hops || {}).mocha,
    webpackConfig.testRunner
  );
  prepareWebpack(options, function (err, config) {
    if (err) {
      throw err;
    } else if (options.watch) {
      runner.watch(options, config);
    } else {
      runner.run(options, config);
    }
  });
}

// eslint-disable-next-line no-console
console.log(util.format(
  'hops@%s: %s',
  require('../package.json').version,
  process.argv[2] || 'start'
));

switch (process.argv[2]) {
  case 'build': return build();
  case 'watch': return watch();
  case 'serve': return serve();
  case 'test': return test();
  default: return (process.env.NODE_ENV === 'production') ? build() : serve();
}
