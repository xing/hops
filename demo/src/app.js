import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { headline } from './styles.css';

const Home = () => (
  <h1 className={headline}>Hello World!</h1>
);

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
  </Switch>
);

export default App;
