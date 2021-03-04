import React from 'react';
import renderer from 'react-test-renderer';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from '../';

HelmetProvider.canUseDOM = false;

it('renders loading state correctly', () => {
  const tree = renderer
    .create(
      <HelmetProvider>
        <Home data={{ loading: true }} />
      </HelmetProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders loaded state correctly', () => {
  const data = {
    loading: false,
    jobSearchByQuery: {
      collection: [
        {
          jobDetail: {
            id: '1',
            url: 'https://www.xing.com/jobs/1',
            title: 'some job',
            companyInfo: {
              company: {
                companyName: 'cool company',
              },
            },
          },
        },
      ],
    },
  };
  const tree = renderer.create(
    <HelmetProvider>
      <Home data={data} />
    </HelmetProvider>
  );
  expect(tree).toMatchSnapshot();
});
