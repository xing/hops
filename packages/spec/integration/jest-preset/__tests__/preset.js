describe('jest-preset', () => {
  it('allows to use typescript', () => {
    const calculator = require('./setup/calculator').default;
    expect(calculator(2, 40)).toEqual(42);
  });
});
