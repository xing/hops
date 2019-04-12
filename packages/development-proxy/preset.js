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
                { type: 'string', maxLength: 0 },
                { type: 'string', format: 'uri' },
                {
                  type: 'object',
                  properties: {
                    target: {
                      oneOf: [
                        { type: 'string', maxLength: 0 },
                        { type: 'string', format: 'uri' },
                      ],
                    },
                  },
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
