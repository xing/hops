'use strict';

const mergeWith = require('lodash.mergewith');
const flatten = require('flat');
const isPlainObject = require('is-plain-obj');
const escapeRegExp = require('escape-string-regexp');

exports.invariant = (condition, message) => {
  if (condition) return;
  throw new Error(`Invariant violation: ${message}`);
};

exports.validate = (strategy, checkArgs = () => {}, checkResult = () => {}) =>
  Object.defineProperty(
    (functions, ...initialArgs) =>
      strategy(
        functions.map((fn) => (...callArgs) => {
          checkArgs(callArgs, initialArgs);
          const result = fn(...callArgs);
          if (result && result instanceof Promise) {
            return result.then((result) => {
              checkResult(result, true, callArgs, initialArgs);
              return result;
            });
          } else {
            checkResult(result, false, callArgs, initialArgs);
            return result;
          }
        }),
        ...initialArgs
      ),
    'name',
    { value: strategy.name }
  );

exports.getMixinSortOrder = (...args) =>
  args.reduce((enableLegacyMixinSortOrder, config) => {
    if ('enableLegacyMixinSortOrder' in config) {
      return config.enableLegacyMixinSortOrder;
    }
    return enableLegacyMixinSortOrder;
  }, false);

exports.merge = (enableLegacyMixinSortOrder = false) => (...args) => {
  return mergeWith({}, ...args, (objValue, srcValue, key) => {
    if (Array.isArray(objValue)) {
      if ('mixins' === key) {
        // #542: remove this in untool v3 if no potential side-effects have been
        // discovered
        if (enableLegacyMixinSortOrder) {
          return [...objValue, ...srcValue].filter(
            (curr, index, self) => self.indexOf(curr) === index
          );
        }

        return [
          ...objValue.filter((curr) => !srcValue.includes(curr)),
          ...srcValue,
        ];
      }
      return srcValue;
    }
  });
};

exports.placeholdify = (config) => {
  const flatConfig = flatten(config);
  const configPaths = Object.keys(flatConfig).map(escapeRegExp);
  const regExp = new RegExp(`<(${configPaths.join('|')})>`, 'g');
  const replaceRecursive = (item) => {
    if (Array.isArray(item)) {
      return item.map(replaceRecursive);
    }
    if (isPlainObject(item)) {
      return Object.entries(item).reduce(
        (result, [key, value]) => ({
          ...result,
          [key]: replaceRecursive(value),
        }),
        {}
      );
    }
    if (typeof item === 'string' && regExp.test(item)) {
      return item.replace(regExp, (_, key) =>
        replaceRecursive(flatConfig[key] || '')
      );
    }
    return item;
  };
  return replaceRecursive(config);
};

exports.environmentalize = (_config, whitelist = {}) => {
  const _env = {};
  const env = global._env || process.env;
  const regExp = /\[([a-zA-Z_][a-zA-Z0-9_]*)(?:=(.*?))?\]/g;
  const replaceRecursive = (item, path = []) => {
    if (Array.isArray(item)) {
      return item.map((nestedItem) => replaceRecursive(nestedItem, path));
    }
    if (isPlainObject(item)) {
      return Object.entries(item).reduce(
        (result, [key, value]) => ({
          ...result,
          [key]: replaceRecursive(value, [...path, key]),
        }),
        {}
      );
    }
    if (typeof item === 'string' && regExp.test(item)) {
      return item.replace(regExp, (_, key, fallback) => {
        const replaced = env[key] || fallback || '';
        if (whitelist[path.join('.')]) {
          _env[key] = replaced;
        }
        return replaceRecursive(replaced);
      });
    }
    return item;
  };
  return { ...replaceRecursive(_config), _config, _env };
};
