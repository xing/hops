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
