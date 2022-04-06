'use strict';

const prettyMS = require('pretty-ms');
const isPlainObject = require('is-plain-obj');
const EnhancedPromise = require('eprom');
const { async, sync } = require('mixinable');
const { trimLeadingSlash } = require('pathifist');
const { Mixin } = require('hops-mixin');

const { callable: callableAsync } = async;
const { sequence, callable: callableSync } = sync;

const {
  internal: { validate, invariant },
} = require('hops-bootstrap');

class ExpressMixin extends Mixin {
  constructor(...args) {
    super(...args);
    this.serverAddressPromise = new EnhancedPromise();
  }
  runServer(mode) {
    const run = require('../lib/run');
    const app = this.createServer(mode);
    return run(app, this);
  }
  createServer(mode) {
    const create = require('../lib/serve');
    return create(mode, this);
  }
  getServerAddress() {
    return Promise.resolve(this.serverAddressPromise);
  }
  configureServer(app, middlewares, mode) {
    const helmet = require('helmet');
    const nocache = require('nocache');
    const express = require('express');
    const mime = require('mime');
    const cookieParser = require('cookie-parser');
    const { distDir, helmetConfig = {} } = this.config;
    middlewares.preinitial.push(
      helmet({ contentSecurityPolicy: false, ...helmetConfig }),
      cookieParser()
    );
    middlewares.files.push(
      express.static(distDir, {
        maxAge: '1y',
        setHeaders: (res, filePath) => {
          const { noCache } = res.locals || {};
          if (noCache || mime.getType(filePath) === 'text/html') {
            nocache()(null, res, () => {});
          }
        },
        redirect: false,
      })
    );
    middlewares.postfiles.push(nocache());
    if (typeof this.getLogger === 'function') {
      const loggerMiddleware = require('../lib/log');
      app.use(loggerMiddleware(this.getLogger()));
    }

    if (mode === 'serve' && process.env.NODE_ENV === 'production') {
      middlewares.prefiles.push(require('compression')());
    }
  }
  inspectServer(server) {
    if (typeof this.getLogger === 'function') {
      const logger = this.getLogger();
      server.on('startup', (address) => {
        const { basePath = '' } = this.config;
        this.serverAddressPromise.resolve(address);
        logger.info(`listening at ${address}/${trimLeadingSlash(basePath)}`);
      });
      server.on('shutdown', () => {
        const { gracePeriod } = this.config;
        const timeout = prettyMS(gracePeriod);
        logger.warn(`shutting down in ${timeout}`);
      });
    }
  }
  registerCommands(yargs) {
    const { name } = this.config;
    yargs.command(
      this.configureCommand({
        command: 'serve',
        describe: `Serve ${name}`,
        builder: {
          production: {
            alias: 'p',
            default: false,
            describe: 'Enable production mode',
            type: 'boolean',
          },
        },
        handler: () => this.runServer('serve'),
      })
    );
  }
  handleArguments(argv) {
    this.options = { ...this.options, ...argv };
  }
}

ExpressMixin.strategies = {
  configureServer: validate(sequence, ([app, middlewares, mode]) => {
    invariant(
      app && app.handle && app.route,
      'configureServer(): Received invalid Express app'
    );
    invariant(
      isPlainObject(middlewares) && Object.keys(middlewares).length >= 16,
      'configureServer(): Received invalid middlewares object'
    );
    invariant(
      typeof mode === 'string',
      'configureServer(): Received invalid mode string'
    );
  }),
  inspectServer: validate(sequence, ([server]) => {
    invariant(
      server && typeof server.listen === 'function',
      'inspectServer(): Received invalid HTTP server instance'
    );
  }),
  getServerAddress: validate(
    callableAsync,
    ({ length }) => {
      invariant(
        length === 0,
        'getServerAddress(): Received unexpected argument(s)'
      );
    },
    (result, isAsync) => {
      invariant(
        typeof result === 'string',
        'getServerAddress(): Returned invalid address string'
      );
      invariant(isAsync, 'getServerAddress(): Returned no promise');
    }
  ),
  runServer: validate(callableSync, ([mode]) => {
    invariant(
      typeof mode === 'string',
      'runServer(): Received invalid mode string'
    );
  }),
  createServer: validate(
    callableSync,
    ([mode]) => {
      invariant(
        typeof mode === 'string',
        'createServer(): Received invalid mode string'
      );
    },
    (result) => {
      invariant(
        result && result.handle && result.route,
        'createServer(): Returned invalid Express app'
      );
    }
  ),
};

module.exports = ExpressMixin;
