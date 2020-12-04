const { performance } = require('perf_hooks');

// TODO: figure out good values
const upperThreshold = 0.75;
const lowerThreshold = 0.6;

function createCircuitBreaker(app) {
  let elu = performance.eventLoopUtilization();
  app.locals.breaker = 'closed';
  app.locals.noSSR = false;

  let last = performance.now();

  return (req, res, next) => {
    elu = performance.eventLoopUtilization();
    const now = performance.now();
    if (now - last > 1000) {
      last = now;
      console.log('current ELU', elu.utilization);
    }

    // we're using `app.locals` instead of `res.locals` here, because then
    // other parts of the application (for example a load balancer health check)
    // can also use `app.locals` in order to respond with an unhealthy state
    if (elu.utilization > upperThreshold) {
      if (app.locals.breaker === 'closed') {
        console.log('app.locals.breaker', 'open');
      }
      app.locals.breaker = 'open';
    } else {
      if (app.locals.breaker === 'open') {
        console.log('app.locals.breaker', 'closed');
      }
      app.locals.breaker = 'closed';
    }

    if (app.locals.breaker === 'open') {
      return res.status(503).end();
    }

    // I suppose we should also write this state to `app.locals`, so that the
    // load balancer health check can already see that the app is experiencing
    // high load
    if (elu.utilization > lowerThreshold) {
      if (app.locals.noSSR === false) {
        console.log('app.locals.noSSR', 'true');
      }
      res.locals.noSSR = true;
      app.locals.noSSR = true;
    } else {
      if (app.locals.noSSR === true) {
        console.log('app.locals.noSSR', 'false');
      }
      res.locals.noSSR = false;
      app.locals.noSSR = false;
    }

    return next();
  };
}

module.exports = { createCircuitBreaker };
