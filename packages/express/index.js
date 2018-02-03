'use strict';

var utils = require('./lib/utils');
var createApp = require('./lib/app');

module.exports = {
  runServer: function runServer(options, callback) {
    utils.run(createApp(options), callback);
  },
  startServer: function(callback) {
    module.exports.runServer({}, callback);
  },
  createApp: createApp,
  utils: utils,
};
