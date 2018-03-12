import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Miss, Header } from 'hops-react';

export default () => {
  return (
    <Switch>
      <Route
        path="/headers/simple"
        render={() => {
          return (
            <Fragment>
              <Header name="foo" value="bar" />
              <Header name="x-accel-expires" value="no" />
            </Fragment>
          );
        }}
      />
      <Route
        path="/headers/multiple"
        render={() => {
          return <Header name="set-cookie" value={['foo=bar', 'bar=foo']} />;
        }}
      />
      <Route
        path="/headers/function"
        render={() => {
          return (
            <Fragment>
              <Header name="foo" value="ba" />
              <Header
                name="foo"
                value={headers => {
                  return headers.foo + 'r';
                }}
              />
            </Fragment>
          );
        }}
      />
      <Miss />
    </Switch>
  );
};
