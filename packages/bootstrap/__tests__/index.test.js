const { join } = require('path');
// eslint-disable-next-line node/no-missing-require
const test = require('ava');
// eslint-disable-next-line node/no-missing-require
const sinon = require('sinon');
const { initialize } = require('..');

test('Should create a explicitly given mixin', (t) => {
  initialize({ mixins: [join(__dirname, 'fixtures', 'test-mixin')] });

  t.truthy(require('./fixtures/test-mixin').mixinCreated);
});

test('Should connect mixins through strategies', (t) => {
  const instance = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'a-mixin'),
      join(__dirname, 'fixtures', 'another-mixin'),
    ],
  });

  t.is(instance.callFirst(), 'execute callSecond');
});

test('Should support override stategie by order of mixins', (t) => {
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

  t.is(instance1.override(), 'from another-mixin');
  t.is(instance2.override(), 'from a-mixin');
});

test('Should support parallel stategie', (t) => {
  const instance = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'a-mixin'),
      join(__dirname, 'fixtures', 'another-mixin'),
    ],
  });

  t.deepEqual(instance.parallel(), ['from a-mixin', 'from another-mixin']);
});

test('Should support pipe stategie', (t) => {
  const instance = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'a-mixin'),
      join(__dirname, 'fixtures', 'another-mixin'),
    ],
  });

  t.is(instance.pipe(''), 'Hello World');
});

test('Should support compose stategie', (t) => {
  const instance = initialize({
    mixins: [
      join(__dirname, 'fixtures', 'a-mixin'),
      join(__dirname, 'fixtures', 'another-mixin'),
    ],
  });

  t.deepEqual(instance.compose({ input: 0 }), {
    'a-mixin': { 'another-mixin': { input: 0 } },
  });
});

test('Should allow placeholders in the configuration which are resolved', (t) => {
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

  t.is(config.result1, 'value');
  t.is(config.result2, 'value');
});

test('Should allow env-vars in the configuration which are resolved', (t) => {
  process.env.UNTOOL_TEST_KEY = 'value';
  process.env.ENV_KEY_WITH_DEFAULT2 = 'value';

  const instance = initialize({
    result1: '[UNTOOL_TEST_KEY]',
    result2: '[ENV_KEY_WITH_DEFAULT1=default-value]',
    result3: '[ENV_KEY_WITH_DEFAULT2=default-value]',
    mixins: [join(__dirname, 'fixtures', 'config-mixin')],
  });

  const config = instance.getConfig();

  t.is(config.result1, 'value');
  t.is(config.result2, 'default-value');
  t.is(config.result3, 'value');
});

test('Should ignore non-string values when checking for placeholders', (t) => {
  const spy = sinon.spy(RegExp.prototype, 'test');
  const preset = {
    result1: () => '[SOME_ENV_VAR]',
    result2: () => '<result1>',
    result3: 'foobar',
    result4: '<result3>',
    result5: '[UNTOOL_TEST_KEY]',
    mixins: [join(__dirname, 'fixtures', 'config-mixin')],
  };
  const instance = initialize(preset);
  const config = instance.getConfig();

  t.is(preset.result1, config.result1);
  t.is(preset.result2, config.result2);
  t.false(spy.calledWith(preset.result1));
  t.false(spy.calledWith(preset.result2));
  t.true(spy.calledWith('<result3>'));
  t.true(spy.calledWith('[UNTOOL_TEST_KEY]'));

  spy.restore();
});

test('Should support validate stategie decorator', (t) => {
  const instance = initialize({
    mixins: [join(__dirname, 'fixtures', 'validate-mixin')],
  });

  t.throws(() => instance.validateAndFailArgs(), 'This is invalid');
  t.throws(() => instance.validateAndFailResult(), 'This is invalid');
  t.is(instance.validateAndSucceed(), 'Call result');
});
