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
        describe: 'Clean up artifacts in build / cache directories before building',
        type: 'boolean'
      }
    },
    handler: function buildHandler (argv) {
      hopsBuild.runBuild(argv, callback);
    }
  };
};
