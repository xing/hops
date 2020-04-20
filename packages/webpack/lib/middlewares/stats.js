'use strict';

module.exports = function createStatsMiddleware(enhancedPromise) {
  return function statsMiddleware(req, res, next) {
    enhancedPromise
      .then((stats) => {
        res.locals = { ...res.locals, stats };
        next();
      })
      .catch(next);
  };
};
