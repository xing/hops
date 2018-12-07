/* eslint-env jest */

describe('graphql server mixin', () => {
  const warn = console.warn;

  beforeEach(() => {
    console.warn = warn;
  });

  it('should warn if no fragments file exists', () => {
    console.warn = jest.fn();

    jest.mock('fs', () => ({
      existsSync: jest.fn((...args) => {
        if (args[0] === '/non-existant-path') return false;
        return require.requireActual('fs').existsSync(...args);
      }),
      ...require.requireActual('fs'),
    }));

    const ServerMixin = require('../mixin.server');
    new ServerMixin({ fragmentsFile: '/non-existant-path' }, {});

    expect(console.warn).toHaveBeenCalledWith(
      'Could not find a graphql introspection query result at %s.',
      '/non-existant-path',
      'You might need to execute `hops graphql introspect`'
    );
  });
});
