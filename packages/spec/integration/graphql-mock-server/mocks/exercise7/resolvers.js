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
