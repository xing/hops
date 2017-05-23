import React from 'react';

import { headline } from './styles.css';

import { render, Route, Switch } from 'hops-react';
import { createContext } from 'hops-redux';

const Home = () => (
  <h1 className={headline}>Hello World!</h1>
);

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
  </Switch>
);

export default render(<App />, createContext());
