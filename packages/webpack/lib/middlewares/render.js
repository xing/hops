const {
  spawnCompilation,
  spawnForkedCompilation,
} = require('../utils/compiler');

module.exports = (buildConfigArgs, watch, mixin) => {
  let enhancedPromise;

  if (mixin) {
    enhancedPromise = watch
      ? spawnForkedCompilation(mixin, buildConfigArgs)
      : spawnCompilation(mixin, buildConfigArgs);
  } else {
    enhancedPromise = spawnCompilation(mixin, buildConfigArgs);
  }

  return function renderMiddleware(req, res, next) {
    enhancedPromise
      .then((middleware) => middleware(req, res, next))
      .catch(next);
  };
};
