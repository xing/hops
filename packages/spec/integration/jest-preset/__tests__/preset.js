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
});
