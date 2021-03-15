const { join } = require('path');
const { getApolloVersion } = require('./lib/apollo-version');

module.exports = {
  mixins: [
    __dirname,
    // TODO: remove with Hops v15
    getApolloVersion() === 2
      ? join(__dirname, 'mixins', 'apollo2')
      : join(__dirname, 'mixins', 'apollo3'),
  ],
  fragmentsFile: '<rootDir>/fragmentTypes.json',
  allowServerSideDataFetching: true,
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
    allowServerSideDataFetching: {
      type: 'boolean',
    },
  },
};
