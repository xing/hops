#!/usr/bin/env node
'use strict';

var hopsBuild = require('..');

module.exports = function defineDevelopCommand (args) {
  args.command({
    command: 'develop',
    describe: 'Starts a webpack-dev-server to enable local development with ' +
      'hot code reloading',
    builder: {
      static: {
        alias: 's',
        default: false,
        describe: 'Serve app in hot mode with static env variable turned on',
        type: 'boolean'
      },
      clean: {
        alias: 'c',
        default: true,
        describe: 'Clean up artifacts in build / cache directories before ' +
          'building',
        type: 'boolean'
      }
    },
    handler: function developHandler (argv) {
      process.env.HOPS_MODE = argv.static ? 'static' : 'dynamic';
      hopsBuild.runServer(argv);
    }
  });
};

if (require.main === module) {
  require('hops-local-cli').run(module.exports, 'develop');
}
