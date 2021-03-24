import React from 'react';
import renderer from 'react-test-renderer';
import Counter from '../';

describe('Counter', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Counter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
