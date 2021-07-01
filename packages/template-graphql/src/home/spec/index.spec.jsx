import { mockServer, graphql } from 'hops-msw/unit';
import { withApolloTestProvider } from 'hops-react-apollo';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import renderer, { act } from 'react-test-renderer';
import HomeWithData, { Home } from '../index.jsx';

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
  mockServer.use(
    graphql.query('search', (req, res, ctx) => {
      return res(
        ctx.data({
          __typename: 'Query',
          jobSearchByQuery: {
            __typename: 'JobSearchResult',
            collection: [
              {
                __typename: 'JobItemResult',
                jobDetail: {
                  __typename: 'VisibleJob',
                  id: '1',
                  url: 'https://www.xing.com/jobs/1',
                  title: 'some job',
                  companyInfo: {
                    __typename: 'JobCompanyInfo',
                    company: {
                      __typename: 'Company',
                      companyName: 'cool company',
                    },
                  },
                },
              },
            ],
          },
        })
      );
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
