/**
 * This example demonstrates how to define a resolver for interfaces that are
 * implemented by multiple types.
 * In this case the Interfaces "Person" and "Node" are both implemented by the
 * types "Account" and "Contact".
 * See also: ../index.js and ../../package.json for an example of how to
 * configure these custom schema additions and resolvers.
 */

module.exports = {
  Person: {
    __resolveType(obj) {
      return obj.typeName;
    },
  },
  Query: {
    persons: () => [
      { typeName: 'Account', id: 1, login: 'john.doe', name: 'John Doe' },
      {
        typeName: 'Contact',
        id: '223-abc',
        name: 'Max Mustermann',
        phone: '00xx',
      },
    ],
  },
};
