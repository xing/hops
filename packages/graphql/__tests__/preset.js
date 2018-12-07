/* eslint-env jest */

describe('graphql preset', () => {
  it('should match snapshot', () => {
    expect(require('../preset')).toMatchSnapshot();
  });
});
