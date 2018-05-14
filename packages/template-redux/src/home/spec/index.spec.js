import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../';

it('renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
