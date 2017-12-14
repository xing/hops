import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';

import styles from './styles.css';
import query from './commits.gql';

const withCommits = graphql(query);

export const Home = ({ data: { loading, github: { repo } = {} } }) => (
  <div>
    <Helmet>
      <title>Hops Demo</title>
    </Helmet>
    <h1 className={styles.headline}>Hello World!</h1>
    {loading ? (
      <div>loading commits...</div>
    ) : (
      repo.commits.map(commit => {
        const repoUrl = `https://github.com/${repo.owner.login}/${repo.name}`;
        return (
          <p key={commit.sha}>
            <a href={`${repoUrl}/commit/${commit.sha}`}>"{commit.message}"</a>{' '}
            by <b>{commit.author.login || commit.author.name}</b>
          </p>
        );
      })
    )}
  </div>
);

export default withCommits(Home);
