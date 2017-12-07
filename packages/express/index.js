'use strict';

var server = require('hops-server');
var createApp = require('./app');

function runServer(options, callback) {
  server.run(createApp(options), callback);
}

module.exports = {
  createApp: createApp,
  runServer: runServer,
  startServer: function(callback) {
    runServer({}, callback);
  },
};
