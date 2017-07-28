import React from 'react';
import renderer from 'react-test-renderer';
import { Home } from '../src/Home';

it('renders correctly', () => {
  const tree = renderer.create(<Home message="ey yo captain jack" />).toJSON();
  expect(tree).toMatchSnapshot();
});
