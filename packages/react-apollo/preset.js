const { join } = require('path');

module.exports = {
  mixins: [__dirname, join(__dirname, 'mixins')],
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
