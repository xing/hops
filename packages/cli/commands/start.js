#!/usr/bin/env node
'use strict';

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
          'Clean up artifacts in build / cache directories before ' +
          'building',
        type: 'boolean',
      },
      production: {
        alias: 'p',
        default: false,
        describe:
          'Minifies the output, generates source maps and removes ' +
          'React developer warnings',
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
      var packageName =
        process.env.NODE_ENV === 'production' ? 'hops-express' : 'hops-build';
      if (require('../lib/package-manager').isPackageInstalled(packageName)) {
        require(packageName).runServer(argv);
      } else {
        console.error('Package missing: ', packageName);
        process.exit(1);
      }
    },
  });
};

if (require.main === module) {
  require('..').run(module.exports, 'start');
}
