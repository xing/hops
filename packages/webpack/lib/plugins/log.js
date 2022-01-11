const { EOL } = require('os');
const prettyMS = require('pretty-ms');
const prettyBytes = require('pretty-bytes');
const chalk = require('chalk');
const { BuildError, CoreJsResolutionError } = require('../utils/errors');

const statsToJsonOptions = {
  all: false,
  assets: true,
  performance: true,
  errors: true,
  warnings: true,
  children: true,
};

const getCoreJsResolutionErrorCulprit = (error) => {
  const [, pkg] =
    error.match(
      /^[^\n]+\nModule not found: Error: Can't resolve 'core-js\/[^']+' in '[^']+\/node_modules\/([^/]+)[^']+'$/
    ) || [];
  return pkg;
};

const formatAssets = (assets) =>
  assets
    .filter(({ name }) => !name.endsWith('.map'))
    .map(({ name, size, isOverSizeLimit }) => {
      const prettySize = isOverSizeLimit
        ? chalk.level > 0
          ? chalk.red(prettyBytes(size))
          : `${prettyBytes(size)} !!!`
        : prettyBytes(size);

      return `${chalk.gray('-')} ${name} (${prettySize})`;
    })
    .join(EOL);

const formatError = (name, duration, isRebuild) => {
  const message = `bundling '${name}' failed after ${duration}`;
  return isRebuild ? `re-${message}` : message;
};

const formatWarning = (name, duration, assets, isRebuild) => {
  const message = `bundling '${name}' finished with warnings after ${duration}`;
  return isRebuild ? `re-${message}` : `${message}\n${formatAssets(assets)}`;
};

const formatSuccess = (name, duration, assets, isRebuild) => {
  const totalSize = Object.values(assets)
    .filter((asset) => asset.name && !asset.name.endsWith('.map'))
    .reduce((sum, asset) => {
      return sum + asset.size;
    }, 0);
  const message = `bundling '${name}' finished after ${duration} (${prettyBytes(
    totalSize
  )})`;
  return isRebuild ? `re-${message}` : `${message}\n${formatAssets(assets)}`;
};

exports.LoggerPlugin = class LoggerPlugin {
  constructor(logger, performance, target) {
    this.logger = logger;
    this.performance = performance;
    this.target = target;
    this.lastHashes = {};
  }

  apply(compiler) {
    compiler.hooks.done.tap('HopsLoggerPlugin', (stats) => {
      const { name } = stats.compilation;

      if (this.lastHashes[name] === stats.hash) {
        return;
      }

      const { hints, maxAssetSize } = this.performance;
      const { hash, startTime, endTime } = stats;
      const isRebuild = Boolean(this.lastHashes[name]);
      const duration = prettyMS(endTime - startTime);
      const { assets } = stats.toJson(statsToJsonOptions);
      const shouldEmitAssetSizeFeedback =
        ['warning', 'error'].includes(hints) && this.target === 'build';
      const assetsOverSizeLimit =
        shouldEmitAssetSizeFeedback &&
        assets.some(({ isOverSizeLimit }) => isOverSizeLimit);

      if (assetsOverSizeLimit && !isRebuild) {
        const message = `Some assets exceed the size limit of ${prettyBytes(
          maxAssetSize
        )}.`;
        if (hints === 'error') {
          stats.compilation.errors.push(message);
        }
        if (hints === 'warning') {
          stats.compilation.warnings.push(message);
        }
      }

      const { errors, warnings, children } = stats.toJson(statsToJsonOptions);
      const hasWarnings = stats.hasWarnings();
      const hasErrors = stats.hasErrors();

      if (hasErrors) {
        this.logger.info(formatError(name, duration, isRebuild));
      } else {
        if (hasWarnings) {
          this.logger.info(formatWarning(name, duration, assets, isRebuild));
        } else {
          this.logger.info(formatSuccess(name, duration, assets, isRebuild));
        }
      }
      if (hasErrors || hasWarnings) {
        errors
          .concat(...children.map((c) => c.errors))
          .reduce((acc, { message: error }) => {
            const coreJsResolutionErrorCulprit =
              getCoreJsResolutionErrorCulprit(error);
            if (coreJsResolutionErrorCulprit) {
              const isFirstOccurrence = !acc.some(
                (e) =>
                  e instanceof CoreJsResolutionError &&
                  e.pkg === coreJsResolutionErrorCulprit
              );
              if (isFirstOccurrence) {
                acc.push(
                  new CoreJsResolutionError(coreJsResolutionErrorCulprit)
                );
              }
            } else {
              acc.push(new BuildError(error));
            }
            return acc;
          }, [])
          .forEach((error) => this.logger.error(error));

        warnings
          .concat(...children.map((c) => c.warnings))
          .forEach(({ message: warning, moduleName, loc }) => {
            this.logger.warn(warning, chalk.gray(`(${moduleName}:${loc})`));
          });
      }

      this.lastHashes[name] = hash;
    });
  }
};
