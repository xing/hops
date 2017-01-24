'use strict';

var path = require('path');

var defaultConfig = require('../../etc/render');

var projectDir = path.resolve(__dirname, 'good');

module.exports = Object.assign({}, defaultConfig, {
  entry: projectDir,
  output: Object.assign({}, defaultConfig.output, {
    path: projectDir
  }),
  context: projectDir
});
