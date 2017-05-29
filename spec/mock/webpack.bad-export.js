'use strict';

var path = require('path');

var defaultConfig = require('hops-config/configs/render');

var projectDir = path.resolve(__dirname, 'bad-export');

module.exports = Object.assign({}, defaultConfig, {
  entry: projectDir,
  output: Object.assign({}, defaultConfig.output, {
    path: projectDir
  }),
  context: projectDir
});
