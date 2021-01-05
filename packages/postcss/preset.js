module.exports = {
  mixins: [__dirname],
  postcss: {
    namedExport: false,
  },
  configSchema: {
    postcss: {
      type: 'object',
      properties: {
        namedExport: {
          type: 'boolean',
        },
      },
      additionalProperties: false,
    },
  },
};
