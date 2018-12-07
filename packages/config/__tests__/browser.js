/**
 * @jest-environment jsdom
 */

describe('hops-config browser export', () => {
  it('should match snapshot', () => {
    expect(require('../browser')).toMatchSnapshot();
  });
});
