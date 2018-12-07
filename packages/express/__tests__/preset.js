/* eslint-env jest */

describe('express preset', () => {
  it('should match snapshot', () => {
    expect(require('../preset')).toMatchSnapshot();
  });
});
