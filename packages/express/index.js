'use strict';

var server = require('hops-server');
var createApp = require('./app');

module.exports = {
  createApp: createApp,
  startServer: function startServer (callback) {
    server.run(createApp(), callback);
  }
};
