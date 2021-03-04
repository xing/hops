import { Miss, render } from 'hops';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Miss />
  </Switch>
);

export default render(<App />);
