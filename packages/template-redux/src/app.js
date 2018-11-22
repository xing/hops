import { Miss, render } from 'hops';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Counter from './counter';
import Home from './home';
import reducers from './reducers';

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

export default render(<App />, {
  redux: {
    reducers: reducers,
    actionCreators: [
      {
        path: '/*',
        action: () => {
          console.log('@@@@@DISPATCH ME');

          return () => {};
        },
      },
    ],
  },
});
