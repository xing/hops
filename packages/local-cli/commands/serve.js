'use strict';

var hopsExpress = require('hops-express');

module.exports = function serveCommand (callback) {
  return {
    command: 'serve',
    describe: 'Starts a production-ready Node.js server to serve your ' +
    'application',
    builder: {},
    handler: function serveHandler () {
      hopsExpress.startServer(callback);
    }
  };
};
