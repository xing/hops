module.exports = {
  User: {
    name: parent => `${parent}-mocked`,
  },
  Query: {
    viewer: () => ({}),
  },
};
