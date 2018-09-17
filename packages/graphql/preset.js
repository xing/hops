module.exports = {
  fragmentsFile: '<rootDir>/fragmentTypes.json',
  graphqlSchemaFile: '',
  graphqlUri: '',
  graphqlMocks: '',
  enableGraphqlMockServer: process.env.NODE_ENV !== 'production',
  mixins: [__dirname],
};
