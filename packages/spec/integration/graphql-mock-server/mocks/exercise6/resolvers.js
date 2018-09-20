/**
 * This example demonstrates how to define a resolver for unions that consist
 * of multiple types.
 * In this case the union "SearchablePerson" can be either "Account" or
 * "Contact".
 * See also: ../index.js and ../../package.json for an example of how to
 * configure these custom schema additions and resolvers.
 */

module.exports = {
  SearchablePerson: {
    __resolveType(obj) {
      return obj.typeName;
    },
  },
  Query: {
    searchPersons: () => [
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
