#!/usr/bin/env node

function run(location, options) {
  var babelIgnore = options.babelIgnore.match(/\/(.*?)\/([gimy])?$/);

  require('babel-register')({
    ignore: new RegExp(babelIgnore[1], babelIgnore[2])
  });

  require('css-modules-require-hook')({
    generateScopedName: options.localIdentName
  });

  var mainRender = require(options.main);
  if (mainRender.__esModule) { // eslint-disable-line no-underscore-dangle
    mainRender = mainRender.default;
  }

  return mainRender(location, options);
}

try {
  run(
    process.argv[2] || '/',
    JSON.parse(process.argv[3] || 'null')
  )
  .then(function (result) {
    process.stdout.write(JSON.stringify(result));
  });
}
catch (e) {
  process.stderr.write(e);
  process.exit(1); // eslint-disable-line no-process-exit
}
