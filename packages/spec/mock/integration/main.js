import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Miss, render, createContext } from 'hops-react';

import { headline } from './style.css';

const Home = () => (<h1 className={headline}>Hello World!</h1>);

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Miss />
  </Switch>
);

export default render(<App />, createContext());
