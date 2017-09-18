'use strict';

module.exports = {
  runBuild: function callRunBuild () {
    return require('hops-build').runBuild.apply(null, arguments);
  },
  runDevelop: function callRunDevelop () {
    return require('hops-build').runServer.apply(null, arguments);
  },
  runServe: function callRunServe () {
    return require('./commands/serve').apply(null, arguments);
  },
  startServer: function callStartServer () {
    return require('./lib/server').apply(null, arguments);
  }
};
