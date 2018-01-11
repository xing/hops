'use strict';

function isBooleanIsh(object) {
  return /(true|false)/.test(object);
}

function isNumberIsh(object) {
  // eslint-disable-next-line no-useless-escape
  return /^(\-|\+)?(\d+(\.\d+)?|Infinity)$/.test(object);
}

function isArrayIsh(object) {
  var keys = Object.keys(object);
  return (
    keys.length > 0 &&
    !keys.filter(function(key) {
      return !/^\d+$/.test(key);
    }).length
  );
}

function typify(object) {
  if (typeof object === 'string') {
    if (isBooleanIsh(object)) {
      return object === 'true';
    } else if (isNumberIsh(object)) {
      return parseFloat(object);
    } else {
      try {
        return JSON.parse(object);
      } catch (_) {
        return object;
      }
    }
  } else if (isArrayIsh(object)) {
    return Object.keys(object)
      .sort()
      .map(function(key) {
        return typify(object[key]);
      });
  }
  return Object.keys(object).reduce(function(result, key) {
    result[key] = typify(object[key]);
    return result;
  }, {});
}

module.exports = function parseEnv(namespace) {
  var prefix = 'npm_package_config_' + (namespace ? namespace + '_' : '');
  return typify(
    Object.keys(process.env).reduce(function(result, key) {
      if (key.indexOf(prefix) === 0) {
        var segments = key.replace(prefix, '').split('_');
        if (!segments[0]) {
          segments.shift();
          segments[0] = '_' + segments[0];
        }
        segments.reduce(function(result, segment, index) {
          if (index < segments.length - 1) {
            result = result[segment] || (result[segment] = {});
          } else {
            result[segment] = process.env[key];
          }
          return result;
        }, result);
      }
      return result;
    }, {})
  );
};
