/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^_" }] */

'use strict';

const { isAbsolute } = require('path');

const Ajv = require('ajv');
const isPlainObject = require('is-plain-obj');

const configureAjv = (ajv) => {
  ajv.addKeyword('absolutePath', {
    errors: true,
    type: 'string',
    compile(expected, schema) {
      const callback = (data) => {
        if (expected !== isAbsolute(data)) {
          callback.errors = [
            {
              keyword: 'absolutePath',
              params: { absolutePath: data },
              message: `${
                expected ? 'should be' : 'should not be'
              } an absolute path`,
              parentSchema: schema,
            },
          ];
          return false;
        }
        return true;
      };
      callback.errors = [];
      return callback;
    },
  });
  ajv.addKeyword('isFunction', {
    compile(expected, schema) {
      const callback = (data) => {
        if (isPlainObject(data)) {
          const values = Object.values(data);
          return values.length === 0 || values.every((data) => callback(data));
        }
        if ((typeof data === 'function') !== expected) {
          callback.errors = [
            {
              keyword: 'isFunction',
              params: { isFunction: data },
              message: `${expected ? 'should' : 'should not'} be a function`,
              parentSchema: schema,
            },
          ];
          return false;
        }
        return true;
      };
      callback.errors = [];
      return callback;
    },
  });
};

exports.validate = (config, properties) => {
  const ajv = new Ajv({ allErrors: true });
  const additional = {
    patternProperties: {
      '^.*$': {
        isFunction: false,
      },
    },
    additionalProperties: false,
  };
  const { _config, _env, ...baseConfig } = config;

  configureAjv(ajv);

  if (ajv.validate({ properties, ...additional }, baseConfig)) {
    return [];
  } else {
    return ajv.errors.map(
      ({ dataPath, message }) => `config${dataPath} ${message}`
    );
  }
};
