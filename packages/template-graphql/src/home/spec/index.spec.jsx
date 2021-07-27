import { getMockServer } from 'hops-msw/unit';
import { graphql } from 'hops-msw';
import { withApolloTestProvider } from 'hops-react-apollo';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import renderer, { act } from 'react-test-renderer';
import HomeWithData, { Home } from '../index.jsx';
import { jobSearchByQueryData } from '../../../mocks';

HelmetProvider.canUseDOM = false;

it('renders loading state correctly', () => {
  const tree = renderer
    .create(
      <HelmetProvider>
        <Home loading={true} />
      </HelmetProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders loaded state correctly', () => {
  const data = {
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
      <Home data={data} loading={false} />
    </HelmetProvider>
  );
  expect(tree).toMatchSnapshot();
});

it('loads graphql data', async () => {
  getMockServer().use(
    graphql.query('search', (req, res, ctx) => {
      return res(ctx.data(jobSearchByQueryData()));
    })
  );

  const tree = renderer.create(
    withApolloTestProvider(
      <HelmetProvider>
        <HomeWithData />
      </HelmetProvider>
    )
  );

  await act(async () => {
    await new Promise((res) => setTimeout(res, 10));
  });

  expect(tree).toMatchSnapshot();
});
