'use strict';

var hopsBuild = require('hops-build');

module.exports = function buildCommand (callback) {
  return {
    command: 'build',
    describe: 'Builds the browser and server JS bundles',
    builder: {
      static: {
        alias: 's',
        default: false,
        describe: 'Statically build locations',
        type: 'boolean'
      },
      clean: {
        alias: 'c',
        default: true,
        describe: 'Clean up artifacts in build / cache directories before ' +
          'building',
        type: 'boolean'
      },
      production: {
        alias: 'p',
        default: false,
        describe: 'Minifies the output, generates source maps and removes ' +
          'React developer warnings',
        type: 'boolean'
      }
    },
    handler: function buildHandler (argv) {
      if (argv.production) {
        process.env.NODE_ENV = 'production';
      }
      process.env.HOPS_MODE = argv.static ? 'static' : 'dynamic';
      hopsBuild.runBuild(argv, callback);
    }
  };
};
