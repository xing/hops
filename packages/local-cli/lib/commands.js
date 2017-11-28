'use strict';

var fs = require('fs');
var path = require('path');

var hopsConfig = require('hops-config');

var binDir = path.resolve(hopsConfig.appDir, 'node_modules', '.bin');

module.exports = function findCommands() {
  if (fs.existsSync(binDir)) {
    return fs
      .readdirSync(binDir)
      .filter(function(command) {
        return command.indexOf('hops-') === 0;
      })
      .map(function(command) {
        return path.join(binDir, command);
      });
  } else {
    return [];
  }
};
