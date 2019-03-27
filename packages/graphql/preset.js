module.exports = {
  mixins: [__dirname],
  fragmentsFile: '<rootDir>/fragmentTypes.json',
  graphqlMockServerPath: '/graphql',
  shouldPrefetchOnServer: true,
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
      absolutePath: true,
    },
    graphqlMockServerPath: {
      type: 'string',
    },
    shouldPrefetchOnServer: {
      type: 'boolean',
    },
  },
};
