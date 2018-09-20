/**
 * This example demonstrates how to implement a custom resolver for single field
 * of a remote schema (the GitHub schema in this case).
 * See also: ../index.js and ../../package.json on how to configure these
 * resolvers and remote schemas.
 */

module.exports = {
  User: {
    name: parent => `${parent}-mocked`,
  },
  Query: {
    viewer: () => ({}),
  },
};
