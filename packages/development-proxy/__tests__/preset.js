/* eslint-env jest */

describe('development proxy preset', () => {
  it('should match snapshot', () => {
    expect(require('../preset')).toMatchSnapshot();
  });
});
