import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { render, Miss } from 'hops-react';
import { createContext } from 'hops-redux';

import { headline } from './styles.css';

const withMessage = connect(state => state.foo);

const Home = withMessage(props => (
  <div>
    <Helmet>
      <title>Hops Demo</title>
    </Helmet>
    <h1 className={headline}>{ props.message }</h1>
  </div>
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
