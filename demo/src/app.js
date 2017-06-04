import React from 'react';

import { headline } from './styles.css';

import { render, Route, Switch, Miss } from 'hops-react';
import { createContext } from 'hops-redux';

const Home = () => (
  <h1 className={headline}>Hello Worlds!</h1>
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

export default render(<App />, createContext({
  reducers: {
    foo: function (state, action) {
      // console.log(state, action);
      return Object.assign({}, state);
    }
  },
  actionCreators: {
    '/:foo': function (params) {
      return function (dispatch) {
        // console.log(params);
      };
    }
  }
}));
