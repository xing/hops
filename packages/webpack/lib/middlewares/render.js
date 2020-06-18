const { join } = require('path');
const { existsSync } = require('fs');
const EnhancedPromise = require('eprom');
const { spawnCompilation } = require('../utils/compiler');

function loadRenderMiddleware(dir, filename) {
  const pathName = join(dir, filename);
  delete require.cache[pathName];
  return require(pathName);
}

function tryLoadRenderMiddleware(dir, filename) {
  const path = join(dir, filename);

  if (existsSync(path)) {
    return require(path);
  } else {
    return null;
  }
}

function createRenderMiddleware(mixin, name, target, options = {}) {
  const promise = new EnhancedPromise();

  spawnCompilation(mixin, name, target, options).subscribe(
    ({ output: { path, filename } }) => {
      promise.reset();
      promise.resolve(loadRenderMiddleware(path, filename));
    }
  );

  return (req, res, next) => {
    promise.then((middleware) => middleware(req, res, next), next);
  };
}

function createWebpackMiddleware(buildConfigArgs, watch, mixin) {
  // TODO: deprecate
  const [buildName, webpackTarget] =
    buildConfigArgs.length === 1
      ? [undefined, buildConfigArgs[0]]
      : buildConfigArgs;

  return createRenderMiddleware(mixin, buildName || 'render', webpackTarget, {
    buildName,
    develop: watch,
    forkProcess: watch,
  });
}

module.exports = {
  createRenderMiddleware,
  createWebpackMiddleware,
  tryLoadRenderMiddleware,
};
