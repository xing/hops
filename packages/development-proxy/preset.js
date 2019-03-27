module.exports = {
  mixins: [__dirname],
  configSchema: {
    proxy: {
      oneOf: [
        {
          type: 'string',
          format: 'uri',
        },
        {
          type: 'object',
          patternProperties: {
            '^/': {
              oneOf: [
                { type: 'string', format: 'uri' },
                {
                  type: 'object',
                  properties: { target: { type: 'string', format: 'uri' } },
                },
              ],
            },
          },
          additionalProperties: false,
        },
      ],
    },
  },
};
