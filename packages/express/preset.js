'use strict';

const { join } = require('path');

module.exports = {
  https: false,
  host: '[HOST]',
  port: '[PORT]',
  distDir: join('<rootDir>', 'dist'),
  gracePeriod: 30000,
  mixins: [join(__dirname, 'mixins')],
  configSchema: {
    https: {
      oneOf: [
        {
          type: 'object',
          properties: {
            keyFile: { type: 'string', minLength: 1, absolutePath: true },
            certFile: { type: 'string', minLength: 1, absolutePath: true },
          },
        },
        { type: 'boolean' },
      ],
    },
    host: { type: 'string' },
    port: { oneOf: [{ type: 'string' }, { type: 'number' }] },
    distDir: { type: 'string', minLength: 1, absolutePath: true },
    gracePeriod: { type: 'number' },
    helmetConfig: {
      type: 'object',
    },
  },
};
