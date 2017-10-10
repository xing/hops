'use strict';

var hopsBuild = require('hops-build');
var hopsExpress = require('hops-express');

module.exports = function startCommand (callback) {
  return {
    command: 'start',
    describe: 'Starts a development or production server, based on NODE_ENV',
    builder: {
      clean: {
        alias: 'c',
        default: true,
        describe: 'Clean up artifacts in build / cache directories before building',
        type: 'boolean'
      }
    },
    handler: function startHandler (argv) {
      if (process.env.NODE_ENV === 'production') {
        hopsExpress.startServer(callback);
      } else {
        hopsBuild.runServer(argv, callback);
      }
    }
  };
};
