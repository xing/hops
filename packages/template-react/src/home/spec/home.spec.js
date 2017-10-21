// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import { Home } from '../home';

it('renders correctly', () => {
  const tree = renderer.create(
    <Home data={{ loading: true }} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
