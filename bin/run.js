#!/usr/bin/env node
'use strict';

var url = require('url');

var npmlog = require('npmlog');

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var config = require('../config');
var pkg = require('../package.json');

var logInfo = npmlog.log.bind(npmlog, 'info', 'hops');
var logError = npmlog.log.bind(npmlog, 'error', 'hops');

function runStart (config) {
  if (process.env.NODE_ENV === 'production') {
    return run('build', config);
  } else {
    return run('develop', config);
  }
}

function runBuild (config) {
  webpack(config).run(function (error, stats) {
    if (error) {
      logError(error.stack.toString());
    } else {
      logInfo(stats.toString({ chunks: false }));
    }
  });
}

function runDevelop (config) {
  var serverConfig = Object.assign(
    { host: '0.0.0.0', port: 8080 },
    config.devServer
  );
  var server = new WebpackServer(
    webpack(config),
    serverConfig
  );
  server.listen(
    serverConfig.port,
    serverConfig.host,
    function (error) {
      if (error) {
        logError(error.stack.toString());
      } else {
        logInfo(url.format({
          protocol: serverConfig.https ? 'https' : 'http',
          hostname: serverConfig.host,
          port: serverConfig.port
        }));
      }
    }
  );
}

function run (command) {
  try {
    logInfo('hops@%s: %s', pkg.version, command);
    switch (command) {
      case 'start':
        runStart(config);
        break;
      case 'build':
        runBuild(require(config.buildConfig));
        break;
      case 'develop':
        runDevelop(require(config.developConfig));
        break;
      default:
        throw new Error('unknown command: ' + command);
    }
  } catch (error) {
    logError(error.stack.toString());
  }
}

if (require.main === module) {
  var argv = require('minimist')(process.argv.slice(2));
  run(argv._[0] || process.env.npm_lifecycle_event);
} else {
  module.exports = {
    run: run,
    runBuild: runBuild,
    runDevelop: runDevelop
  };
}
