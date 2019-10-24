import React from 'react';
import renderer from 'react-test-renderer';
import { HelmetProvider } from 'react-helmet-async';
import Home from '../';

HelmetProvider.canUseDOM = false;

it('renders correctly', () => {
  const tree = renderer
    .create(
      <HelmetProvider>
        <Home />
      </HelmetProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
