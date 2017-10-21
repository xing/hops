'use strict';

var server = require('hops-server');
var createApp = require('./app');

module.exports = {
  createApp: createApp,
  runServer: function runServer (options, callback) {
    server.run(createApp(), callback);
  }
};
