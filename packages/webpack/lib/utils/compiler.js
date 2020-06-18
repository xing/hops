const { fork } = require('child_process');
const { join } = require('path');
const requireFromString = require('require-from-string');
const MemoryFS = require('memory-fs');
const sourceMapSupport = require('source-map-support');
const EnhancedPromise = require('eprom');
const { BuildError, CompilerError } = require('../utils/errors');

function createCompiler(webpackConfig) {
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);

  return compiler;
}

function spawnCompilation(mixin, buildConfigArgs) {
  const webpackConfig = mixin.getBuildConfig(...buildConfigArgs);

  const compiler = createCompiler(webpackConfig);
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

function spawnForkedCompilation(mixin, buildConfigArgs) {
  const {
    options,
    config: { _overrides: overrides },
  } = mixin;

  const child = fork(join(__dirname, 'forkedCompiler'));

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

module.exports = { createCompiler, spawnCompilation, spawnForkedCompilation };
