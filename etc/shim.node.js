#!/usr/bin/env node

var config = require('../lib/config');

require('babel-register')({
  ignore: config.babelIgnore
});

require('css-modules-require-hook')({
  generateScopedName: config.cssName
});

var mainRender = require(config.appRoot);
if (mainRender.__esModule) { // eslint-disable-line no-underscore-dangle
  mainRender = mainRender.default;
}

try {
  mainRender(
    process.argv[2] || '/',
    JSON.parse(process.argv[3] || 'null')
  )
  .then(function (body) {
    process.stdout.write(body);
  });
}
catch (e) {
  process.stderr.write(e);
  process.exit(1); // eslint-disable-line no-process-exit
}
