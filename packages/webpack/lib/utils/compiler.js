const { join } = require('path');
const { fork } = require('child_process');
const Observable = require('zen-observable');
const sourceMapSupport = require('source-map-support');

const {
  BuildError,
  CompilerError,
  deserializeError,
} = require('../utils/errors');

function createCompiler(webpackConfig) {
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);

  return compiler;
}

function startCompilation(webpackConfig, options = {}) {
  const { watch } = options;
  const compiler = createCompiler(webpackConfig);
  const output = join(webpackConfig.output.path, webpackConfig.output.filename);

  sourceMapSupport.install({ environment: 'node' });

  return new Observable((subscriber) => {
    const callback = (error, stats) => {
      if (error) {
        subscriber.error(new CompilerError(error));
      } else if (stats.hasErrors()) {
        stats.toJson({ all: false, errors: true }).errors.forEach((error) => {
          subscriber.error(new BuildError(error));
        });
      } else {
        subscriber.next({
          output,
          stats: stats.toJson({
            chunks: false,
            modules: false,
            entrypoints: false,
          }),
        });
      }

      if (!watch) {
        subscriber.complete();
      }
    };

    if (watch) {
      compiler.watch(webpackConfig.watchOptions, callback);
    } else {
      compiler.run((error, stats) => {
        if (error) {
          callback(error);
        }

        compiler.close((error) => {
          callback(error, stats);
        });
      });
    }
  });
}

function forkCompilation(mixin, buildConfigArgs, options = {}) {
  const { watch } = options;
  const configureArgs = [mixin.config._overrides, mixin.options];
  const child = fork(join(__dirname, 'compiler-fork'));

  process.on('exit', () => child.kill());

  child.send({
    name: 'start',
    buildConfigArgs,
    configureArgs,
    options,
  });

  return new Observable((subscriber) => {
    child.on('error', (error) => {
      error.recoverable = false;
      subscriber.error(error);
    });

    child.on('exit', (code, signal) => {
      if (code !== 0) {
        const error = new Error(
          `Webpack child compiler exited with code: ${code} and signal: ${signal}`
        );
        error.recoverable = false;
        subscriber.error(error);
      }
    });

    child.on('message', ({ type, data, reason }) => {
      if (type === 'reject') {
        subscriber.error(
          typeof reason === 'string'
            ? new BuildError(reason)
            : deserializeError(reason)
        );
      } else if (type === 'resolve') {
        subscriber.next(data);
      }

      if (!watch) {
        subscriber.complete();
      }
    });
  });
}

module.exports = { createCompiler, startCompilation, forkCompilation };
