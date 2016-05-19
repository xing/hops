
import React, { createClass, PropTypes } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { render, register } from 'hops';

import { headline } from './style.css';

export const { update, select } = register('home');

export const Home = connect(select, { update })(
  createClass({
    displayName: 'Home',
    propTypes: {
      greeting: PropTypes.string,
      update: PropTypes.func
    },
    componentDidMount() {
      this.props.update({ greeting: {'$set': 'Hello World!'}});
    },
    render() {
      return (
        <h1 className={ headline }>{ this.props.greeting }</h1>
      );
    }
  })
);

export const routes = (
  <Route path='/' component={ Home }/>
);

export default render({ routes });
