import React from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { parse } from 'qs';

const QUERY = gql`
  {
    foo
    bar
  }
`;

export const suffixes = [
  'html',
  'failed',
  'erroneous',
  '401',
  '403',
  '404',
  '429',
  '503',
];

const errorPolicy = searchString => {
  const allowedPolicies = ['none', 'ignore', 'all'];
  let result;
  try {
    result = parse(searchString).errorPolicy;
  } catch (e) {} //eslint-disable-line no-empty
  return allowedPolicies.includes(result) ? result : 'none';
};

const TestQuery = ({ suffix, location: { search } }) => {
  if (!suffixes.includes(suffix)) {
    throw new Error(`Path suffix "${suffix}" is invalid.`);
  }

  return (
    <Query
      query={QUERY}
      errorPolicy={errorPolicy(search.substring(1))}
      context={{ headers: { 'x-url-suffix': suffix } }}
    >
      {({ data, loading, error }) => {
        if (loading) return null;
        if (error) return <b>{error.message}</b>;

        return <h1>{data.foo}</h1>;
      }}
    </Query>
  );
};

export default withRouter(TestQuery);
