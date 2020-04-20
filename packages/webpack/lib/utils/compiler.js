'use strict';

const { fork } = require('child_process');
const { join } = require('path');

const requireFromString = require('require-from-string');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const sourceMapSupport = require('source-map-support');
const { serializeError } = require('serialize-error');

const EnhancedPromise = require('eprom');

const { configure } = require('../../');
const { BuildError, CompilerError } = require('../utils/errors');

function createCompiler(webpackConfig) {
  const compiler = webpack(webpackConfig);
  compiler.outputFileSystem = new MemoryFS();
  sourceMapSupport.install({ environment: 'node', hookRequire: true });
  return new Promise((resolve, reject) => {
    compiler.run((compileError, stats) => {
      if (compileError) {
        reject(new CompilerError(compileError));
      } else if (stats.hasErrors()) {
        reject(
          new BuildError(
            stats.toJson({ all: false, errors: true }).errors.shift()
          )
        );
      } else {
        const { path, filename } = webpackConfig.output;
        const filepath = join(path, filename);
        compiler.outputFileSystem.readFile(
          filepath,
          'utf-8',
          (error, content) => {
            if (error) return reject(error);
            resolve(requireFromString(content, filepath));
          }
        );
      }
    });
  });
}
exports.createCompiler = createCompiler;

function createWatchCompiler(buildConfigArgs, options, overrides) {
  const child = fork(__filename);
  process.on('exit', () => child.kill());
  child.send({
    name: 'start',
    buildConfigArgs,
    overrides,
    options,
  });
  let middleware;
  return new EnhancedPromise((resolve, reject, reset) => {
    child.on('message', ({ type, data, reason }) => {
      if (type === 'reject') {
        reject(
          typeof reason === 'string'
            ? new BuildError(reason)
            : new CompilerError(reason)
        );
      } else if (type === 'reset') {
        reset();
      } else if (type === 'resolve') {
        if (middleware) process.emit('RELOAD');
        resolve((middleware = middleware || require(data)));
      }
    });
  });
}
exports.createWatchCompiler = createWatchCompiler;

process.on('message', (message) => {
  if (message.name !== 'start') return;
  const { buildConfigArgs, overrides, options } = message;
  const webpackConfig = configure(overrides, options).getBuildConfig(
    ...buildConfigArgs
  );
  try {
    const compiler = webpack(webpackConfig);
    compiler.hooks.watchRun.tap('RenderMiddleware', () =>
      process.send({ type: 'reset' })
    );
    compiler.watch(webpackConfig.watchOptions, (compileError, stats) => {
      if (compileError) {
        process.send({
          type: 'reject',
          reason: new CompilerError(compileError),
        });
      } else if (stats.hasErrors()) {
        process.send({
          type: 'reject',
          reason: new BuildError(
            stats.toJson({ all: false, errors: true }).errors.shift()
          ),
        });
      } else {
        const { path, filename } = webpackConfig.output;
        const filepath = join(path, filename);
        process.send({ type: 'resolve', data: filepath });
      }
    });
  } catch (error) {
    process.send({
      type: 'reject',
      reason: serializeError(error),
    });
  }
});
