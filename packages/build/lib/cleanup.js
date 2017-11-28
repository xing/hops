'use strict';

var rimraf = require('rimraf');

module.exports = function cleanup(directories) {
  return Promise.all(
    directories.map(function(dir) {
      return new Promise(function(resolve) {
        rimraf(dir, resolve);
      });
    })
  );
};
