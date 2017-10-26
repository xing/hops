// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import { Home } from '../home';

it('renders loading state correctly', () => {
  const tree = renderer.create(
    <Home data={{ loading: true }} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders loaded state correctly', () => {
  const data = {
    loading: false,
    github: {
      repo: {
        commits: [{
          sha: 'foo',
          message: 'bar',
          author: {
            login: 'baz'
          }
        }]
      }
    }
  };
  const tree = renderer.create(
    <Home data={ data } />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
