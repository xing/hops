/**
 * @jest-environment node
 */

describe('hops-config node export', () => {
  it('should match snapshot', () => {
    expect(require('../index')).toMatchSnapshot();
  });
});
