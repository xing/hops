/**
 * This example demonstrates how to implement and use enums.
 * In this case they are used to filter the "searchPersons" query via typName.
 * See also: ../index.js and ../../package.json for an example of how to
 * configure these custom schema additions and resolvers.
 */

module.exports = {
  TypeFilter: {
    ACCOUNT: 'Account',
    CONTACT: 'Contact',
  },
  Query: {
    searchPersons: (_, { filter: { type } = {} }) =>
      [
        { typeName: 'Account', id: 1, login: 'john.doe', name: 'John Doe' },
        {
          typeName: 'Contact',
          id: '223-abc',
          name: 'Max Mustermann',
          phone: '00xx',
        },
      ].filter(x => (!type ? true : x.typeName === type)),
  },
};
