import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { render, Miss } from 'hops-react';
import { graphqlExtension } from 'hops-graphql';

import { Home } from './home';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Miss />
  </Switch>
);

export default render(<App />, {
  extensions: [graphqlExtension()],
});
