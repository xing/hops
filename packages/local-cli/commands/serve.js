'use strict';

var hopsExpress = require('hops-express');

module.exports = function serveCommand (callback) {
  return {
    command: 'serve',
    describe: 'Starts a production-ready Node.js server to serve your ' +
    'application',
    builder: {
      static: {
        alias: 's',
        default: false,
        describe: 'Serve built app with static env variable turned on',
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
    handler: function serveHandler (argv) {
      if (argv.production) {
        process.env.NODE_ENV = 'production';
      }
      process.env.HOPS_MODE = argv.static ? 'static' : 'dynamic';
      hopsExpress.startServer(callback);
    }
  };
};
