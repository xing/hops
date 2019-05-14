import gql from 'graphql-tag';
import { render } from 'hops';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { Query } from 'react-apollo';

import TestQuery, { suffixes } from './query';

const commits = gql`
  query commits {
    showCommits @client
    github {
      repo(ownerUsername: "xing", name: "hops") {
        commits(limit: 10) {
          ... on GithubCommit {
            sha
            message
            author {
              ... on GithubUser {
                login
              }
            }
          }
        }
      }
    }
  }
`;

const App = () => (
  <Switch>
    <Route
      path="/"
      exact={true}
      render={() => (
        <Query query={commits}>
          {({ loading, error, data }) => {
            if (loading) return <b id="loading">loading commits...</b>;
            if (error) return <b id="error">Error: {error.message}</b>;

            if (!data.showCommits) {
              return null;
            }
            return (
              <ul id="commits">
                {data.github.repo.commits.map(commit => (
                  <li key={commit.sha}>
                    {commit.message} by <b>{commit.author.login}</b>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      )}
    />
    {suffixes.map(path => (
      <Route
        key={path}
        path={`/${path}`}
        exact={true}
        render={() => <TestQuery suffix={path} />}
      />
    ))}
  </Switch>
);

export default render(<App />, {
  graphql: {
    resolvers: {
      Query: {
        showCommits() {
          return true;
        },
      },
    },
  },
});
