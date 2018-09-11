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
