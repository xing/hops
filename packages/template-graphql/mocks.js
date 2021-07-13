// eslint-disable-next-line node/no-unpublished-require
const { graphql } = require('hops-msw');

function jobSearchByQueryData() {
  return {
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
  };
}

module.exports.jobSearchByQueryData = jobSearchByQueryData;

module.exports.handlers = [
  graphql.query('search', (req, res, ctx) => {
    return res(ctx.data(jobSearchByQueryData()));
  }),
];
