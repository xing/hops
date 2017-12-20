#!/usr/bin/env node
'use strict';

module.exports = function defineBuildCommand(args) {
  args.command({
    command: 'build',
    describe: 'Builds the browser and server JS bundles',
    builder: {
      static: {
        alias: 's',
        default: false,
        describe: 'Statically build locations',
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
    handler: function buildHandler(argv) {
      if (argv.production) {
        process.env.NODE_ENV = 'production';
      }
      if (argv.static) {
        process.env.HOPS_MODE = 'static';
      }
      require('..').runBuild(argv);
    },
  });
};

if (require.main === module) {
  try {
    require.resolve('hops-local-cli');
    require('hops-local-cli').run(module.exports, 'build');
  } catch (_) {
    require('hops').run(module.exports, 'build');
  }
}
