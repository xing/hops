/* eslint-env jest */

describe('graphql schema shim', () => {
  it('should throw when exported directly', () => {
    expect(() => require('../schema')).toThrow();
  });
});
