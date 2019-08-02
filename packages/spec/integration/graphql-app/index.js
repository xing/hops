import React from 'react';
import { Query } from 'react-apollo';
import { render } from 'hops';

import QUERY from './query.gql';

export const App = () => (
  <Query query={QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <>Loading...</>;
      if (error) return <pre>{JSON.stringify(error)}</pre>;
      return <h1>{data.hello}</h1>;
    }}
  </Query>
);

export default render(<App />);
