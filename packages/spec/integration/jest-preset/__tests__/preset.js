/**
 * @jest-hops-puppeteer off
 */

describe('jest-preset', () => {
  it('allows to use typescript', () => {
    const calculator = require('./setup/calculator').default;
    expect(calculator(2, 40)).toEqual(42);
  });

  it('allows to use flow', () => {
    const calculator = require('./setup/calculator-flow').default;
    expect(calculator(2, 40)).toEqual(42);
  });

  it('allows to require hops runtime code', () => {
    const hops = require('hops');
    expect(hops.render).toBeDefined();
  });

  it('allows to import global css inside a js module', () => {
    // if it does not throw it appears to work
    require('./setup/global-css');
  });

  it('allows to import local css inside a js module', () => {
    const css = require('./setup/local-css');
    expect(css.default.foo).toBe('foo');
  });
});
