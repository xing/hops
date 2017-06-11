import React from 'react';
import { Route, Switch } from 'react-router';
import { render, Miss } from 'hops-react';

import { headline } from './styles.css';

const Home = () => (
  <h1 className={headline}>Hello World!</h1>
);

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Miss />
  </Switch>
);

export default render(<App />);
