/**
 * This example demonstrates how to extend types (and use types) from other
 * schemas. In this example we are extending the "Query" type and are using the
 * "User" type, both of which are defined in the GitHub schema.
 * See also: ../index.js and ../../package.json for an example of how to
 * configure these custom schema additions and resolvers.
 */

module.exports = {
  Query: {
    version: () => '0.0.1',
    me: () => ({ avatarUrl: 'https://mocked.com/' }),
  },
};
