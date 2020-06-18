const { existsSync } = require('fs');
const EnhancedPromise = require('eprom');
const { startCompilation, forkCompilation } = require('../utils/compiler');

function createRenderMiddleware(buildConfigArgs, watch, mixin) {
  let compilation;
  let webpackConfig = buildConfigArgs;

  if (mixin) {
    webpackConfig = mixin.getBuildConfig(...buildConfigArgs);

    compilation = watch
      ? forkCompilation(mixin, buildConfigArgs, { watch })
      : startCompilation(webpackConfig, { watch });
  } else {
    compilation = startCompilation(webpackConfig, { watch });
  }

  const enhancedPromise = new EnhancedPromise();

  compilation.subscribe(({ output }) => {
    enhancedPromise.reset();
    enhancedPromise.resolve(loadRenderMiddleware(output));
  });

  return function renderMiddleware(req, res, next) {
    enhancedPromise
      .then((middleware) => middleware(req, res, next))
      .catch(next);
  };
}

function loadRenderMiddleware(filepath) {
  delete require.cache[filepath];
  return require(filepath);
}

function tryLoadRenderMiddleware(filepath) {
  if (existsSync(filepath)) {
    return require(filepath);
  } else {
    return null;
  }
}

module.exports = {
  createRenderMiddleware,
  loadRenderMiddleware,
  tryLoadRenderMiddleware,
};
