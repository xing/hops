'use strict';

const { createCompiler, createWatchCompiler } = require('../utils/compiler');

module.exports = (buildConfigArgs, watch, mixin) => {
  let enhancedPromise;
  if (mixin) {
    const { options, config, getBuildConfig } = mixin;
    const { _overrides: overrides } = config;
    const webpackConfig = getBuildConfig(...buildConfigArgs);
    enhancedPromise = watch
      ? createWatchCompiler(buildConfigArgs, options, overrides)
      : createCompiler(webpackConfig);
  } else {
    enhancedPromise = createCompiler(buildConfigArgs);
  }
  return function renderMiddleware(req, res, next) {
    enhancedPromise
      .then((middleware) => middleware(req, res, next))
      .catch(next);
  };
};
