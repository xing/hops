const { join } = require('path');
const { serializeError } = require('serialize-error');

const { configure } = require('../../');
const { BuildError, CompilerError } = require('../utils/errors');
const { createCompiler } = require('./compiler');

process.on('message', (message) => {
  if (message.name !== 'start') return;

  const {
    buildConfigArgs,
    configureArgs,
    options: { watch },
  } = message;
  const webpackConfig = configure(...configureArgs).getBuildConfig(
    ...buildConfigArgs
  );
  const {
    output: { path, filename },
    watchOptions,
  } = webpackConfig;
  const output = join(path, filename);

  try {
    const compiler = createCompiler(webpackConfig);
    const callback = (compileError, stats) => {
      if (compileError) {
        process.send({
          type: 'reject',
          reason: new CompilerError(compileError),
        });
      } else if (stats.hasErrors()) {
        stats.toJson({ all: false, errors: true }).errors.forEach((error) => {
          process.send({
            type: 'reject',
            reason: new BuildError(error),
          });
        });
      } else {
        process.send({
          type: 'resolve',
          data: {
            output,
            stats: stats.toJson({
              chunks: false,
              modules: false,
              entrypoints: false,
            }),
          },
        });
      }
    };

    if (watch) {
      compiler.watch(watchOptions, callback);
    } else {
      compiler.run(callback);
    }
  } catch (error) {
    process.send({
      type: 'reject',
      reason: serializeError(error),
    });
  }
});
