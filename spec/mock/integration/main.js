import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Miss, render } from 'hops-react';

import hopsConfig from 'hops-config';

console.log(hopsConfig.appDir);

const Home = () => (<h1>Hello World!</h1>);

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Miss />
  </Switch>
);

export default render(<App />);
