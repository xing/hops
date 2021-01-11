import gql from 'graphql-tag';
import { render } from 'hops';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Query } from '@apollo/client/react/components';

const query = gql`
  query testQuery {
    subject {
      title
    }
  }
`;

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <Query query={query}>
      {({ loading, error, data: { subject } = {} }) => {
        if (loading) return <strong id="loading">loading...</strong>;
        if (error)
          return (
            <strong id="error">
              Error: {error.message}
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </strong>
          );
        return <p>{subject.title}</p>;
      }}
    </Query>
  </>
);
