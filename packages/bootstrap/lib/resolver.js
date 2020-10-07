'use strict';

const { compatibleMessage } = require('check-error');

const {
  sync: resolve,
  create: { sync: createResolver },
} = require('enhanced-resolve');

exports.resolve = resolve;

exports.resolvePreset = createResolver({
  mainFiles: ['preset'],
  mainFields: ['preset'],
  exportsFields: [],
});

exports.resolveMixins = (context, types, mixins) => {
  const result = {};
  const resolvers = {};
  Object.entries(types).forEach(([type, config]) => {
    resolvers[type] = createResolver(config);
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
