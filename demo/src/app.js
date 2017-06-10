import React from 'react';

import { headline } from './styles.css';

import { render, Route, Switch, Miss } from 'hops-react';

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
