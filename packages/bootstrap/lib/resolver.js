'use strict';

const { compatibleMessage } = require('check-error');

const {
  sync: resolve,
  create: { sync: createResolver },
} = require('enhanced-resolve');

const defaultConfig = {
  symlinks: !(
    process.env.NODE_PRESERVE_SYMLINKS == 1 ||
    (typeof process.env.NODE_OPTIONS === 'string' &&
      process.env.NODE_OPTIONS.includes('--preserve-symlinks')) ||
    process.execArgv.includes('--preserve-symlinks')
  ),
};

exports.resolve = resolve;

exports.resolvePreset = createResolver({
  ...defaultConfig,
  mainFiles: ['preset'],
  mainFields: ['preset'],
});

exports.resolveMixins = (context, types, mixins) => {
  const result = {};
  const resolvers = {};
  Object.entries(types).forEach(([type, config]) => {
    resolvers[type] = createResolver({ ...defaultConfig, ...config });
    result[type] = [];
  });
  return mixins.reduce((result, mixin) => {
    const found = Object.entries(resolvers).reduce((found, [key, resolve]) => {
      try {
        return !!result[key].push(resolve(context, mixin));
      } catch (error) {
        if (!exports.isResolveError(error)) throw error;
        return found;
      }
    }, false);
    if (!found) {
      throw new Error(`Can't find mixin '${mixin}' in '${context}'`);
    }
    return result;
  }, result);
};

exports.isResolveError = (error) => compatibleMessage(error, /^Can't resolve/);
