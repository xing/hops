'use strict';

var hopsBuild = require('hops-build');

module.exports = function developCommand (callback) {
  return {
    command: 'develop',
    describe: 'Starts a webpack-dev-server to enable local development with ' +
      'hot code reloading',
    builder: {
      clean: {
        alias: 'c',
        default: true,
        describe: 'Clean up artifacts in build / cache directories before building',
        type: 'boolean'
      }
    },
    handler: function developHandler (argv) {
      hopsBuild.runServer(argv, callback);
    }
  };
};
