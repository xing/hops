import { Miss, render } from 'hops';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Counter from './counter';
import Home from './home';

const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      &nbsp;
      <Link to="/counter">Counter</Link>
    </nav>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/counter" component={Counter} />
      <Miss />
    </Switch>
  </div>
);

export default render(<App />);
