import React from 'react';

import { headline } from './styles.css';

import { Route, Switch, Miss } from 'hops-react';
import { render } from 'hops-redux';

const Home = () => (
  <h1 className={headline}>Hello World!</h1>
);

const Foo = () => (
  <h1 className={headline}>Hello Foo!</h1>
);

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/foo' component={Foo} />
    <Miss />
  </Switch>
);

export default render(<App />, {
  reducers: {
    foo: function (state, action) {
      // console.log(state, action);
      return Object.assign({}, state);
    }
  },
  actionCreators: [
    function (location) {
      return function (dispatch) {
        // console.log(location);
      };
    }
  ]
});
