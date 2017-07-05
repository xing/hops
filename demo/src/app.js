import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { render, Miss } from 'hops-react';
import { createContext } from 'hops-redux';
import { connect } from 'react-redux';

import { headline } from './styles.css';

const withMessage = connect(state => state.foo);

const Home = withMessage(props => (
  <h1 className={headline}>{ props.message }</h1>
));

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Miss />
  </Switch>
);

export default render(<App />, createContext({
  reducers: {
    'foo': state => state || { message: 'Hello World!' }
  }
}));
