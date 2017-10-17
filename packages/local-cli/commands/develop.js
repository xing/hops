'use strict';

var hopsBuild = require('hops-build');

module.exports = function developCommand (callback) {
  return {
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

      hopsBuild.runServer(argv, callback);
    }
  };
};
