import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { render, Miss } from 'hops-react';
import { createContext } from 'hops-redux';

import Home from './home';

const App = () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Miss />
  </Switch>;

export default render(
  <App />,
  createContext({
    reducers: {
      foo: state => state || { message: 'Hello World!' }
    }
  })
);
