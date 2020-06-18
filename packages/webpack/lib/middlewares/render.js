const {
  spawnCompilation,
  spawnForkedCompilation,
} = require('../utils/compiler');

function createWebpackMiddleware(buildConfigArgs, watch, mixin) {
  let enhancedPromise;

  const [buildName, webpackTarget] =
    buildConfigArgs.length === 1
      ? ['render', buildConfigArgs[0]]
      : buildConfigArgs;

  if (mixin && watch) {
    enhancedPromise = spawnForkedCompilation(mixin, buildName, webpackTarget);
  } else {
    enhancedPromise = spawnCompilation(mixin, buildName, webpackTarget);
  }

  return function renderMiddleware(req, res, next) {
    enhancedPromise
      .then((middleware) => middleware(req, res, next))
      .catch(next);
  };
}

module.exports = {
  createWebpackMiddleware,
};
