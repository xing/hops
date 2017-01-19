#!/usr/bin/env node
'use strict';

var url = require('url');

var webpack = require('webpack');
var WebpackServer = require('webpack-dev-server');

var pkg = require('../package.json');
var util = require('../lib/util');


function runStart(config) {
  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-use-before-define
    return run('build', config);
  }
  else {
    // eslint-disable-next-line no-use-before-define
    return run('develop', config);
  }
}


function runBuild(config) {
  webpack(config).run(function(error, stats) {
    if (error) { util.log(error); }
    else {
      util.log(stats.toString({ chunks: false }));
    }
  });
}


function runDevelop(config) {
  var serverConfig = config.devServer;
  var server = new WebpackServer(webpack(config), serverConfig);
  server.listen(serverConfig.port, serverConfig.host, function(err) {
    if (err) { throw err; }
    util.log(url.format({
      protocol: serverConfig.https ? 'https' : 'http',
      hostname: serverConfig.host,
      port: serverConfig.port
    }));
  });
}


function run(command, defaultConfig) {
  var config = util.getConfig(defaultConfig);
  try {
    util.log('hops@%s: %s', pkg.version, command);
    switch (command) {
      case 'start':
        runStart(config);
        break;
      case 'build':
        runBuild(require(config.webpack.build));
        break;
      case 'develop':
        runDevelop(require(config.webpack.develop));
        break;
      default:
        throw new Error('unknown command: ' + command);
    }
  }
  catch (error) {
    util.logError(error);
  }
}


if (require.main === module) {
  var argv = require('minimist')(process.argv.slice(2));
  run(argv._[0] || process.env.npm_lifecycle_event);
}
else {
  module.exports = {
    run: run,
    runBuild: runBuild,
    runDevelop: runDevelop
  };
}
