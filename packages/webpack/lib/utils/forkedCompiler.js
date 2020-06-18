const { serializeError } = require('serialize-error');

const { configure } = require('../../');
const { BuildError, CompilerError } = require('../utils/errors');
const { createCompiler } = require('./compiler');

process.on('message', (message) => {
  if (message.name !== 'build') return;

  const { webpackConfigArgs, overrides, options } = message;
  const webpackConfig = configure(overrides, options).getWebpackConfig(
    ...webpackConfigArgs
  );
  const { path, filename } = webpackConfig.output;
  const [, , { develop }] = webpackConfigArgs;

  try {
    const compiler = createCompiler(webpackConfig);
    const callback = (compileError, stats) => {
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
        process.send({
          type: 'resolve',
          data: {
            output: { path, filename },
            stats: stats.toJson({
              chunks: false,
              modules: false,
              entrypoints: false,
            }),
          },
        });
      }
    };

    if (develop) {
      compiler.watch(webpackConfig.watchOptions, callback);
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
