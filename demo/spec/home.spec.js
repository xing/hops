/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import ConnectedHome from '../src/home';

const { WrappedComponent: Home } = ConnectedHome;

it('renders correctly', () => {
  const tree = renderer.create(
    <Home message='ey yo captain jack' />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
