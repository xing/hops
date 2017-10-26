'use strict';

var server = require('hops-server');
var createApp = require('./app');

function runServer (options, callback) {
  server.run(createApp(), callback);
}

module.exports = {
  createApp: createApp,
  runServer: runServer,
  startServer: runServer // added for backwards compat - remove a.s.a.p.
};
