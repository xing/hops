/* eslint-env node, jest */
const { join } = require('path');
// eslint-disable-next-line node/no-missing-require
const { initialize } = require('..');

test('Should create a explicitly given mixin', () => {
  initialize({ mixins: [join(__dirname, 'fixtures', 'test-mixin')] });

  expect(require('./fixtures/test-mixin').mixinCreated).toBeTruthy();
});

test('Should connect mixins through strategies', () => {
  const instance = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'a-mixin'),
      join(__dirname, 'fixtures', 'another-mixin'),
    ],
  });

  expect(instance.callFirst()).toBe('execute callSecond');
});

test('Should support override stategie by order of mixins', () => {
  const instance1 = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'a-mixin'),
      join(__dirname, 'fixtures', 'another-mixin'),
    ],
  });
  const instance2 = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'another-mixin'),
      join(__dirname, 'fixtures', 'a-mixin'),
    ],
  });

  expect(instance1.override()).toBe('from another-mixin');
  expect(instance2.override()).toBe('from a-mixin');
});

test('Should support parallel stategie', () => {
  const instance = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'a-mixin'),
      join(__dirname, 'fixtures', 'another-mixin'),
    ],
  });

  expect(instance.parallel()).toEqual(['from a-mixin', 'from another-mixin']);
});

test('Should support pipe stategie', () => {
  const instance = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'a-mixin'),
      join(__dirname, 'fixtures', 'another-mixin'),
    ],
  });

  expect(instance.pipe('')).toBe('Hello World');
});

test('Should support compose stategie', () => {
  const instance = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'a-mixin'),
      join(__dirname, 'fixtures', 'another-mixin'),
    ],
  });

  expect(instance.compose({ input: 0 })).toEqual({
    'a-mixin': { 'another-mixin': { input: 0 } },
  });
});

test('Should allow placeholders in the configuration which are resolved', () => {
  const instance = initialize({
    key: 'value',
    nested: {
      key: 'value',
    },
    result1: '<key>',
    result2: '<nested.key>',
    mixins: [join(__dirname, 'fixtures', 'config-mixin')],
  });

  const config = instance.getConfig();

  expect(config.result1).toBe('value');
  expect(config.result2).toBe('value');
});

test('Should allow env-vars in the configuration which are resolved', () => {
  process.env.HOPS_TEST_KEY = 'value';
  process.env.ENV_KEY_WITH_DEFAULT2 = 'value';

  const instance = initialize({
    result1: '[HOPS_TEST_KEY]',
    result2: '[ENV_KEY_WITH_DEFAULT1=default-value]',
    result3: '[ENV_KEY_WITH_DEFAULT2=default-value]',
    mixins: [join(__dirname, 'fixtures', 'config-mixin')],
  });

  const config = instance.getConfig();

  expect(config.result1).toBe('value');
  expect(config.result2).toBe('default-value');
  expect(config.result3).toBe('value');
});

test('Should ignore non-string values when checking for placeholders', () => {
  const spy = jest.spyOn(RegExp.prototype, 'test');
  const preset = {
    result1: () => '[SOME_ENV_VAR]',
    result2: () => '<result1>',
    result3: 'foobar',
    result4: '<result3>',
    result5: '[HOPS_TEST_KEY]',
    mixins: [join(__dirname, 'fixtures', 'config-mixin')],
  };
  const instance = initialize(preset);
  const config = instance.getConfig();

  expect(preset.result1).toBe(config.result1);
  expect(preset.result2).toBe(config.result2);
  expect(spy).not.toHaveBeenCalledWith(preset.result1);
  expect(spy).not.toHaveBeenCalledWith(preset.result2);
  expect(spy).toHaveBeenCalledWith('<result3>');
  expect(spy).toHaveBeenCalledWith('[HOPS_TEST_KEY]');

  spy.mockRestore();
});

test('Should support validate stategie decorator', () => {
  const instance = initialize({
    mixins: [join(__dirname, 'fixtures', 'validate-mixin')],
  });

  expect(() => instance.validateAndFailArgs()).toThrow('This is invalid');
  expect(() => instance.validateAndFailResult()).toThrow('This is invalid');
  expect(instance.validateAndSucceed()).toBe('Call result');
});
