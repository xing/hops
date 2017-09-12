// @flow
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { render, Miss } from 'hops-react';
import { createContext } from 'hops-redux';

import { Home } from './home';
import { Counter } from './counter';

import reducers from './reducers';

const App = () => (
  <div>
    <nav>
      <Link to='/'>Home</Link>&nbsp;
      <Link to='/counter'>Counter</Link>
    </nav>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/counter' component={Counter} />
      <Miss />
    </Switch>
  </div>
);

export default render(
  <App />,
  createContext({
    reducers
  })
);
