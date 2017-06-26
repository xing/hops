import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { render, Miss } from 'hops-react';
import { createContext } from 'hops-redux';

import { headline } from './styles.css';

const Home = () => (
  <h1 className={headline}>Hello World!</h1>
);

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/foo' component={Home} />
    <Miss />
  </Switch>
);

export default render(<App />, createContext({
  reducers: {
    foo: function () { return {}; }
  }
}));
