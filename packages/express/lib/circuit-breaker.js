const { performance } = require('perf_hooks');

// TODO: figure out good values
const upperThreshold = 0.9;
const lowerThreshold = 0.7;
const intervalMs = 1000;

function createCircuitBreaker(app) {
  let elu = performance.eventLoopUtilization();
  let lastMeasurementMs = performance.now();

  return (req, res, next) => {
    // we don't want a new elu measurement for each incoming request, so we
    // throttle it based on how much time passed since the last measurement
    const nowMs = performance.now();
    if (nowMs - lastMeasurementMs > intervalMs) {
      elu = performance.eventLoopUtilization(elu);
      lastMeasurementMs = nowMs;
    }

    // we're using `app.locals` instead of `res.locals` here, because then
    // other parts of the application (for example a load balancer health check)
    // can also use `app.locals` in order to respond with an unhealthy state
    if (elu.utilization > upperThreshold) {
      app.locals.breaker = 'open';
    } else {
      app.locals.breaker = 'closed';
    }

    if (app.locals.breaker === 'open') {
      return res.status(503).end();
    }

    // I suppose we should also write this state to `app.locals`, so that the
    // load balancer health check can already see that the app is experiencing
    // high load
    if (elu.utilization > lowerThreshold) {
      res.locals.noSSR = true;
    } else {
      res.locals.noSSR = false;
    }

    return next();
  };
}

module.exports = { createCircuitBreaker };
