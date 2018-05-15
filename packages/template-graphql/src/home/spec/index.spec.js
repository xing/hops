import React from 'react';
import renderer from 'react-test-renderer';
import { Home } from '../';

it('renders loading state correctly', () => {
  const tree = renderer.create(<Home data={{ loading: true }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders loaded state correctly', () => {
  const data = {
    loading: false,
    github: {
      repo: {
        name: 'hops',
        owner: {
          login: 'xing',
        },
        commits: [
          {
            sha: 'commit-sha-0',
            message: 'commit message',
            author: {
              login: 'commit author login',
            },
          },
          {
            sha: 'commit-sha-1',
            message: 'commit message',
            author: {
              name: 'commit author name',
            },
          },
        ],
      },
    },
  };
  const tree = renderer.create(<Home data={data} />);
  expect(tree).toMatchSnapshot();
});
