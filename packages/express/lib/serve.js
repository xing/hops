'use strict';

// eslint-disable-next-line node/no-deprecated-api
const { create: createDomain } = require('domain');

const debug = require('hops-debug')('hops:express');

const express = require('express');
const finalhandler = require('finalhandler');
const isPlainObject = require('is-plain-obj');

const { Router } = express;

function wrapMiddleware(middleware, domain) {
  return Object.defineProperty(
    domain.bind((...args) => {
      try {
        const maybePromise = middleware(...args);
        if (maybePromise && typeof maybePromise.catch === 'function') {
          maybePromise.catch(args[args.length - 1]);
        }
      } catch (e) {
        args[args.length - 1](e);
      }
    }),
    'length',
    {
      value: middleware.length,
    }
  );
}

module.exports = (mode, { configureServer, handleError }) => {
  const phases = ['initial', 'files', 'parse', 'routes', 'final'].reduce(
    (result, key) => [...result, `pre${key}`, key, `post${key}`],
    []
  );
  const middlewares = phases.reduce(
    (result, key) => ({ ...result, [key]: [] }),
    { phases }
  );
  const app = express();
  const router = new Router();
  const domain = createDomain();

  configureServer(app, middlewares, mode);
  debug(middlewares);

  app.use(router);
  phases.forEach((phase) => {
    const container = /final/.test(phase) ? app : router;
    middlewares[phase].forEach((middleware) => {
      if (isPlainObject(middleware)) {
        const { method = 'all', path = '*', handler } = middleware;
        const handlers = [].concat(handler);
        container[method](
          path,
          ...handlers.map((handler) => wrapMiddleware(handler, domain))
        );
      } else {
        const middlewares = [].concat(middleware);
        container.use(
          ...middlewares.map((middleware) => wrapMiddleware(middleware, domain))
        );
      }
    });
  });
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (res.mock) {
      res.status(500).send();
    } else {
      handleError(err, true);
      finalhandler(req, res)(err);
    }
  });
  app.locals.domain = domain;

  return app;
};
