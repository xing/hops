import { render, Status } from 'hops';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { parse } from 'qs';
import { gql, useQuery } from '@apollo/client';

const QUERY = gql`
  query foo($type: String) {
    foo(type: $type)
    bar
  }
`;

const App = () => (
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <Switch>
      <Route
        path="/invalid-response"
        exact={true}
        component={() => {
          const { loading, error, data } = useQuery(QUERY, {
            errorPolicy: 'none',
            variables: { type: 'invalid-response' },
          });

          if (loading) return null;
          if (error)
            return (
              <>
                <Status code={500} />
                <b>
                  {error.networkError.toString()} -{' '}
                  {error.networkError.bodyText}
                </b>
              </>
            );

          return <h1>{data.foo}</h1>;
        }}
      />
      <Route
        path="/blocked"
        exact={true}
        component={() => {
          const { loading, error, data } = useQuery(QUERY, {
            errorPolicy: 'none',
            variables: { type: 'blocked' },
          });

          if (loading) return null;
          if (error)
            return (
              <>
                <Status code={500} />
                <b>
                  {error.networkError.toString()} -{' '}
                  {error.networkError.bodyText}
                </b>
              </>
            );

          return <h1>{data.foo}</h1>;
        }}
      />
      <Route
        path="/query-error"
        exact={true}
        component={() => {
          const { loading, error, data } = useQuery(QUERY, {
            errorPolicy: 'none',
            variables: { type: 'query-error' },
          });

          if (loading) return null;
          if (error)
            return (
              <>
                <Status code={500} />
                <b>{error.message}</b>
              </>
            );

          return <h1>{data.foo}</h1>;
        }}
      />
      <Route
        path="/resolve-error"
        exact={true}
        component={({ location: { search } }) => {
          const errorPolicy = parse(search.substring(1)).errorPolicy;

          const { loading, error, data } = useQuery(QUERY, {
            errorPolicy,
            variables: { type: 'resolve-error' },
          });

          if (loading) return null;
          if (error)
            return (
              <>
                {errorPolicy === 'all' ? null : <Status code={500} />}
                <b>{error.message}</b>
              </>
            );

          return <h1>{data.foo}</h1>;
        }}
      />
    </Switch>
  </>
);

export default render(<App />);
