const { join } = require('path');
const { serializeError } = require('serialize-error');

const { configure } = require('../../');
const { BuildError, CompilerError } = require('../utils/errors');
const { createCompiler } = require('./compiler');

process.on('message', (message) => {
  if (message.name !== 'start') return;

  const { webpackConfigArgs, overrides, options } = message;
  const webpackConfig = configure(overrides, options).getWebpackConfig(
    ...webpackConfigArgs
  );

  try {
    const compiler = createCompiler(webpackConfig);
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
