#!/usr/bin/env node
'use strict';

module.exports = function defineDevelopCommand(args) {
  args.command({
    command: 'develop',
    describe:
      'Starts a webpack-dev-server to enable local development with ' +
      'hot code reloading',
    builder: {
      static: {
        alias: 's',
        default: false,
        describe: 'Serve app in hot mode with static env variable turned on',
        type: 'boolean',
      },
      clean: {
        alias: 'c',
        default: true,
        describe:
          'Clean up artifacts in build / cache directories before ' +
          'building',
        type: 'boolean',
      },
    },
    handler: function developHandler(argv) {
      if (argv.static) {
        process.env.HOPS_MODE = 'static';
      }
      require('..').runServer(argv);
    },
  });
};

if (require.main === module) {
  require('hops').run(module.exports, 'develop');
}
