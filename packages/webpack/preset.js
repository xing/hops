'use strict';

const { join } = require('path');

module.exports = {
  browsers: ['defaults'],
  node: 'current',
  basePath: '',
  assetPath: '<basePath>',
  buildDir: '<distDir>',
  serverDir: join('<rootDir>', 'node_modules', '.cache', 'hops-webpack'),
  serverFile: 'server.js',
  statsFile: 'stats.json',
  mixins: [
    join(__dirname, 'mixins', 'build'),
    join(__dirname, 'mixins', 'config'),
    join(__dirname, 'mixins', 'develop'),
    join(__dirname, 'mixins', 'render'),
    join(__dirname, 'mixins', 'start'),
    join(__dirname, 'mixins', 'stats'),
    join(__dirname, 'mixins', 'esbuild'),
    join(__dirname, 'mixins', 'swc'),
    join(__dirname, 'mixins', 'optimizations'),
  ],
  mixinTypes: {
    browser: {
      mainFiles: ['mixin.browser', 'mixin.runtime', 'mixin'],
      mainFields: ['mixin:browser', 'mixin:runtime', 'mixin'],
    },
    server: {
      mainFiles: ['mixin.server', 'mixin.runtime', 'mixin'],
      mainFields: ['mixin:server', 'mixin:runtime', 'mixin'],
    },
  },
  browserWhitelist: {
    basePath: true,
  },
  configSchema: {
    browserWhitelist: {
      type: 'object',
      additionalProperties: { type: 'boolean' },
    },
    browsers: {
      type: 'array',
      items: { type: 'string', minLength: 1 },
    },
    experimental: {
      type: 'object',
      properties: {
        babelIncludePatterns: {
          type: 'array',
          items: { type: 'string', minLength: 1 },
        },
      },
    },
    node: { type: 'string', minLength: 1 },
    basePath: { type: 'string' },
    assetPath: { type: 'string' },
    buildDir: { type: 'string', minLength: 1, absolutePath: true },
    serverDir: { type: 'string', minLength: 1, absolutePath: true },
    serverFile: { type: 'string', minLength: 1, absolutePath: false },
    statsFile: { type: 'string', minLength: 1, absolutePath: false },
  },
};
