/**
 * This example implements a mutation with input, output, success and error
 * states.
 * The mutation changes the module scoped variable "something", so that the
 * changed state will be persistent until the server is restarted.
 * See also: ../index.js and ../../package.json for an example of how to
 * configure these custom schema additions and resolvers.
 */

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
