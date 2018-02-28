'use strict';

module.exports = {
  runServer: function runServer(options, callback) {
    return this.utils.run(this.createApp(options), callback);
  },
  startServer: function startServer(callback) {
    console.warn(
      'hops-express "startServer" is deprecated, please use "runServer" instead'
    );
    this.runServer({}, callback);
  },
  get createApp() {
    return require('./lib/app');
  },
  get utils() {
    return require('./lib/utils');
  },
};
