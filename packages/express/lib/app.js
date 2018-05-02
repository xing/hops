'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');
const mime = require('mime');
const helmet = require('helmet');

const {
  createAssetsMiddleware,
  createRewriteMiddleware,
  createTimingsMiddleware,
  createCompressionMiddleware,
} = require('./middlewares');

module.exports = function createApp(options, config, { bootstrap, teardown }) {
  const app = express();
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
    const filePath = path.join(config.cacheDir, 'server.js');
    if (fs.existsSync(filePath)) {
      const middleware = require(filePath);
      app.use(helmet.noCache());
      app.use(createAssetsMiddleware(config));
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
