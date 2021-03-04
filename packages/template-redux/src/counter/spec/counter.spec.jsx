import React from 'react';
import renderer from 'react-test-renderer';
import Counter from '../counter';

describe('Counter', () => {
  let props;

  beforeEach(() => {
    props = {
      count: 0,
      increment: jest.fn(),
      decrement: jest.fn(),
    };
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Counter {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
