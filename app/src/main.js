import React, { createClass, PropTypes } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { render, register } from 'hops';

import { headline } from './style.css';

const select = register('home', (state = {}, action) => (
  (action.type !== 'updateGreeting') ? state : Object.assign(
    {}, state, { greeting: action.payload }
  )
));

const update = (payload) => ({ type: 'updateGreeting', payload });

const Home = connect(select, { update })(
  createClass({
    displayName: 'Home',
    propTypes: {
      greeting: PropTypes.string,
      update: PropTypes.func
    },
    componentDidMount() {
      this.props.update('Hello World!');
    },
    render() {
      return (
        <h1 className={ headline }>{ this.props.greeting }</h1>
      );
    }
  })
);

const routes = (
  <Route path='/' component={ Home }/>
);

export default render({ routes });
export { Home };
