/**
 * This example demonstrates how to use interface types from other schemas.
 * Any interface defined in other schemas (that are loaded before this schema),
 * will be available inside this schema.
 * In this case we are using the "Node" interface that is provided by the GitHub
 * schema.
 * See also: ../index.js and ../../package.json for an example of how to
 * configure these custom schema additions and resolvers.
 */

module.exports = {
  Address: {
    id: ({ name }) => `mocked-${name}`,
    city: () => 'mocked street',
  },
  User: {
    name: () => 'mocked name',
    address: parent => parent,
  },
};
