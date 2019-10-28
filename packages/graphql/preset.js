module.exports = {
  mixins: [__dirname],
  fragmentsFile: '<rootDir>/fragmentTypes.json',
  graphqlMockServerPath: '/graphql',
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
    graphqlMockSchemaFile: {
      type: 'string',
    },
    graphqlMockServerPath: {
      type: 'string',
    },
    shouldPrefetchOnServer: {
      type: 'boolean',
    },
  },
};
