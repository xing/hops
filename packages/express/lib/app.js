'use strict';

const express = require('express');
const mime = require('mime');
const helmet = require('helmet');

const {
  createAssetsMiddleware,
  createRewriteMiddleware,
  createTimingsMiddleware,
  createCompressionMiddleware,
} = require('./middlewares');

module.exports = function createApp(
  options,
  config,
  { initializeServer, bootstrap, teardown, createServerMiddleware }
) {
  const app = express();
  initializeServer(app, options._[0]);
  app.use(createTimingsMiddleware(config));
  app.use(createCompressionMiddleware(config));
  app.use(helmet());
  app.use(createRewriteMiddleware(config));
  app.use(
    express.static(config.buildDir, {
      maxAge: '1y',
      setHeaders: (res, filepath) => {
        if (mime.getType(filepath) === 'text/html') {
          helmet.noCache()(null, res, () => {});
        }
      },
      redirect: false,
    })
  );
  bootstrap(app, config);
  if (options && !options.static) {
    app.use(helmet.noCache());
    app.use(createAssetsMiddleware(config));
    const middleware = createServerMiddleware(options._[0]);
    if (middleware) {
      if (
        process.env.HOPS_MODE === 'static' &&
        Array.isArray(config.locations)
      ) {
        config.locations.forEach(location => {
          app.get(location === '/' ? location : `${location}*`, middleware);
        });
      } else {
        app.all('*', middleware);
      }
    } else {
      console.log(
        'No middleware found. Delivering only statically built routes.'
      );
    }
  }
  teardown(app, config);
  return app;
};
