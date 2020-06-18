const { join } = require('path');
const { fork } = require('child_process');
const Observable = require('zen-observable');

const { BuildError, CompilerError } = require('../utils/errors');

function createCompiler(webpackConfig) {
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);

  return compiler;
}

function spawnCompilation(
  mixin,
  name,
  webpackTarget,
  { forkProcess, ...options }
) {
  if (forkProcess === true) {
    return spawnForkedCompilation(mixin, name, webpackTarget, options);
  }

  const { develop } = options;
  const webpackConfig = mixin.getWebpackConfig(name, webpackTarget, options);
  const compiler = createCompiler(webpackConfig);
  const { path, filename } = webpackConfig.output;

  return new Observable((subscriber) => {
    const callback = (error, stats) => {
      if (error) {
        subscriber.error(new CompilerError(error));
      } else if (stats.hasErrors()) {
        subscriber.error(
          new BuildError(
            stats.toJson({ all: false, errors: true }).errors.shift()
          )
        );
      } else {
        subscriber.next({
          output: { path, filename },
          stats: stats.toJson({
            chunks: false,
            modules: false,
            entrypoints: false,
          }),
        });
      }

      if (!develop) {
        subscriber.complete();
      }
    };

    if (develop) {
      compiler.watch(webpackConfig.watchOptions, callback);
    } else {
      compiler.run(callback);
    }
  });
}

function spawnForkedCompilation(mixin, name, webpackTarget, options = {}) {
  const {
    options: mixinOptions,
    config: { _overrides: overrides },
  } = mixin;

  const child = fork(join(__dirname, 'forkedCompiler'));

  process.on('exit', () => child.kill());

  child.send({
    name: 'build',
    webpackConfigArgs: [name, webpackTarget, options],
    overrides,
    options: mixinOptions,
  });

  return new Observable((subscriber) => {
    child.on('message', ({ type, data, reason }) => {
      if (type === 'reject') {
        subscriber.error(
          typeof reason === 'string'
            ? new BuildError(reason)
            : new CompilerError(reason)
        );
      } else if (type === 'resolve') {
        subscriber.next(data);
      }

      if (!options.develop) {
        subscriber.complete();
        child.kill();
      }
    });
  });
}

module.exports = { createCompiler, spawnCompilation, spawnForkedCompilation };
