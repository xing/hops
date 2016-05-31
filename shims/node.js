#!/usr/bin/env node

function validateOptions(location, options) {
  if (!location) {
    throw new Error('location missing');
  }
  if (!options) {
    throw new Error('options missing');
  }
  if (!('babelIgnore' in options)) {
    throw new Error('"babelIgnore" missing in options');
  }
  if (!('localIdentName' in options)) {
    throw new Error('"localIdentName" missing in options');
  }
  if (!('main' in options)) {
    throw new Error('"main" missing in options');
  }
}

function run(location, options) {
  return new Promise(function (resolve, reject) {
    try {
      validateOptions(location, options);
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
      resolve(mainRender(location, options));
    }
    catch (e) { reject(e); }
  });
}

run(
  process.argv[2] || '/',
  JSON.parse(process.argv[3] || 'null')
)
.then(function (result) {
  process.stdout.write(JSON.stringify(result));
})
.catch(function (error) {
  process.stderr.write(error ? error.toString() : 'not found');
  process.exit(1); // eslint-disable-line no-process-exit
});
