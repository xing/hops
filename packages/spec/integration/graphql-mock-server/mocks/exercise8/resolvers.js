const something = { id: 'xyz', name: 'Empty' };

module.exports = {
  Query: {
    something: () => something,
  },
  Mutation: {
    async doSomething(_, { input: { name } = {} }) {
      await timeout(1000);

      if (name !== 'Hello') {
        return { error: { message: 'mock', code: 'mock', something } };
      }

      Object.assign(something, { name: `${something.name}-${name}` });
      return { success: something };
    },
  },
};

function timeout(timeout) {
  return new Promise(resolve => setTimeout(() => resolve(), timeout));
}
