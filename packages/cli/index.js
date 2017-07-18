'use strict';

module.exports = {
  runBuild: function callRunBuild () {
    return require('./commands/build').apply(null, arguments);
  },
  runDevelop: function callRunDevelop () {
    return require('./commands/develop').apply(null, arguments);
  },
  runServe: function callRunServe () {
    return require('./commands/serve').apply(null, arguments);
  },
  startServer: function callStartServer () {
    return require('./lib/server').apply(null, arguments);
  }
};
