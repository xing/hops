'use strict';

module.exports = exports = {
  runServer: function runServer(options, callback) {
    return exports.utils.run(exports.createApp(options), callback);
  },
  get createApp() {
    return require('./lib/app');
  },
  get utils() {
    return require('./lib/utils');
  },
};
