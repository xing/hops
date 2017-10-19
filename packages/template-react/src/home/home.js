// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { gql, graphql } from 'react-apollo';

import styles from './styles.css';

const withData = graphql(gql`
  {
    github {
      repo(ownerUsername: "xing", name: "hops") {
        id
        name
        commits(limit: 10) {
          ... on GithubCommit {
            sha
            message
            author {
              ... on GithubUser {
                id
                login
              }
            }
          }
        }
      }
    }
  }
`);

const Home = ({ data: { loading, github }}) => (
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

export default withData(Home)
