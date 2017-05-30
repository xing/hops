import React from 'react';

import { headline } from './styles.css';

import { Route, Switch } from 'hops-react';
import { render } from 'hops-redux-enhanced';

const Home = () => (
  <h1 className={headline}>Hello World!</h1>
);

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
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
