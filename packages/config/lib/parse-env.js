'use strict';

function isBooleanIsh (object) {
  return ['true', 'false'].indexOf(object) !== -1;
}

function isNumberIsh (object) {
  return /^\d+$/.test(object);
}

function isArrayIsh (object) {
  return !Object.keys(object).find(function (key) {
    return !isNumberIsh(key);
  });
}

function typify (object) {
  if (typeof object === 'string') {
    if (isBooleanIsh(object)) {
      return object === 'true';
    } else if (isNumberIsh(object)) {
      return parseInt(object, 10);
    }
    try {
      return JSON.parse(object);
    } catch (error) {
      return object;
    }
  } else if (isArrayIsh(object)) {
    return Object.keys(object).sort().map(function (key) {
      return typify(object[key]);
    });
  }
  return Object.keys(object).reduce(function (result, key) {
    result[key] = typify(object[key]);
    return result;
  }, {});
}

module.exports = function parseEnv (namespace) {
  var prefix = 'npm_package_config_' + (namespace ? namespace + '_' : '');
  return typify(Object.keys(process.env).reduce(function (result, key) {
    if (key.indexOf(prefix) === 0) {
      var segments = key.replace(prefix, '').split('_');
      segments.reduce(function (result, segment, index) {
        if (index < segments.length - 1) {
          if (!result[segment]) {
            result[segment] = {};
          }
          result = result[segment];
        } else {
          result[segment] = process.env[key];
        }
        return result;
      }, result);
    }
    return result;
  }, {}));
};
