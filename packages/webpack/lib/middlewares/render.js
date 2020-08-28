const { existsSync } = require('fs');
const EnhancedPromise = require('eprom');
const { startCompilation, forkCompilation } = require('../utils/compiler');

function createRenderMiddleware(
  mixin,
  buildName,
  webpackTarget,
  { forkProcess, ...options } = {}
) {
  let compilation;

  if (forkProcess) {
    compilation = forkCompilation(mixin, buildName, webpackTarget, options);
  } else {
    const webpackConfig = mixin.getWebpackConfig(
      buildName,
      webpackTarget,
      options
    );

    compilation = startCompilation(webpackConfig, options);
  }

  const enhancedPromise = new EnhancedPromise();

  compilation.subscribe(({ output }) => {
    enhancedPromise.reset();
    enhancedPromise.resolve(loadRenderMiddleware(output));
  });

  return (req, res, next) => {
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

function createRenderMiddlewareWrapper(buildConfigArgs, watch, mixin) {
  // TODO: deprecate
  const [buildName, baseConfig] = buildConfigArgs;
  const buildTarget = ['build', 'develop'].includes(baseConfig || buildName)
    ? 'browser'
    : 'server';

  return createRenderMiddleware(mixin, buildName, buildTarget, {
    buildName,
    watch,
  });
}

module.exports = {
  createRenderMiddleware,
  createRenderMiddlewareWrapper,
  loadRenderMiddleware,
  tryLoadRenderMiddleware,
};
