#!/usr/bin/env node
'use strict';

var pm = require('../lib/package-manager');

module.exports = function defineStartCommand(args) {
  args.command({
    command: 'start',
    describe: 'Starts a development or production server, based on NODE_ENV',
    builder: {
      static: {
        alias: 's',
        default: false,
        describe: 'Sets mode to static',
        type: 'boolean',
      },
      clean: {
        alias: 'c',
        default: true,
        describe:
          'Clean up artifacts in build / cache directories before building',
        type: 'boolean',
      },
      production: {
        alias: 'p',
        default: false,
        describe:
          'Minifies the output, generates source maps and removes React ' +
          'developer warnings',
        type: 'boolean',
      },
    },
    handler: function startHandler(argv) {
      if (argv.production) {
        process.env.NODE_ENV = 'production';
      }
      if (argv.static) {
        process.env.HOPS_MODE = 'static';
      }
      if (
        process.env.NODE_ENV === 'production' &&
        pm.isPackageInstalled('hops-express')
      ) {
        if (argv.clean && pm.isPackageInstalled('hops-build')) {
          require('hops-build').runBuild(argv, function(error, stats) {
            if (error) {
              console.error(error.stack.toString());
              process.exit(1);
            } else {
              console.log(
                stats.toString({
                  chunks: false,
                  modules: false,
                  entrypoints: false,
                }),
                '\n'
              );
              require('hops-express').runServer(argv);
            }
          });
        } else {
          require('hops-express').runServer(argv);
        }
      } else if (pm.isPackageInstalled('hops-build')) {
        require('hops-build').runServer(argv);
      } else {
        console.error(
          'Package missing: ',
          process.env.NODE_ENV === 'production' ? 'hops-express' : 'hops-build'
        );
        process.exit(1);
      }
    },
  });
};

if (require.main === module) {
  require('..').run(module.exports, 'start');
}
