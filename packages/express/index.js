'use strict';

var utils = require('./utils');
var createApp = require('./app');

function runServer(options, callback) {
  utils.run(createApp(options), callback);
}

module.exports = {
  createApp: createApp,
  runServer: runServer,
  startServer: function(callback) {
    runServer({}, callback);
  },
  utils: utils,
};
