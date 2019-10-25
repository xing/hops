module.exports = {
  mixins: [__dirname],
  fragmentsFile: '<rootDir>/fragmentTypes.json',
  graphqlMockServerPath: '/graphql',
  configSchema: {
    fragmentsFile: {
      type: 'string',
      absolutePath: true,
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
  },
};
