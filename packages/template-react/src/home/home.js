// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';

import styles from './styles.css';
import query from './commits.gql';

export const withCommits = graphql(query);

export const Home = ({ data: { loading, github } }) => (
  <div>
    <Helmet>
      <title>Hops Demo</title>
    </Helmet>
    <h1 className={styles.headline}>
      Hello World!
    </h1>
    {
      (loading)
        ? (<p>Loading...</p>)
        : (github.repo.commits.map(commit => (
          <p key={commit.sha}>
            "{commit.message}" by <b>{commit.author.login}</b>
          </p>
        )))
    }
  </div>
);

export default withCommits(Home);
