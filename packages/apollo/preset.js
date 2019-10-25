module.exports = {
  mixins: [__dirname],
  fragmentsFile: '<rootDir>/fragmentTypes.json',
  shouldPrefetchOnServer: true,
  browserWhitelist: {
    graphqlUri: true,
  },
  configSchema: {
    fragmentsFile: {
      type: 'string',
      absolutePath: true,
    },
    graphqlUri: {
      type: 'string',
      format: 'uri',
    },
    graphqlSchemaFile: {
      type: 'string',
      absolutePath: true,
    },
    shouldPrefetchOnServer: {
      type: 'boolean',
    },
  },
};
