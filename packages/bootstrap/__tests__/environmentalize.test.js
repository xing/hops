/* eslint-env node, jest */
// eslint-disable-next-line node/no-missing-require
const { environmentalize } = require('..').internal;

test('Should allow env-vars in the configuration which are resolved', () => {
  global._env = {
    FOOBAR: 'TEST',
  };

  const res = environmentalize(
    {
      foo: {
        bar: '[FOOBAR]',
        baz: '[SECOND]',
      },
    },
    { 'foo.bar': true }
  );

  delete global._env;
  expect(res._env.FOOBAR).toBe('TEST');
  expect(res._env.SECOND).toBe(undefined);
});

test('Should allow Object whitelisting', () => {
  global._env = {
    FOOBAR: 'TEST',
    SECOND: 'BANANA',
  };

  const res = environmentalize(
    {
      foo: {
        bar: '[FOOBAR]',
        baz: '[SECOND]',
      },
    },
    { foo: true }
  );

  delete global._env;
  expect(res._env.FOOBAR).toBe('TEST');
  expect(res._env.SECOND).toBe('BANANA');
});
