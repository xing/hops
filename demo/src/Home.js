import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { headline } from './styles.css';

const Home = props =>
  <div>
    <Helmet>
      <title>Hops Demo</title>
    </Helmet>
    <h1 className={headline}>
      {props.message}
    </h1>
  </div>;

export default connect(state => state.foo)(Home);
export { Home };
