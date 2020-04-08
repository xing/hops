import gql from 'graphql-tag';
import { render } from 'hops';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { Query } from 'react-apollo';

import TestQuery from './query';

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
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
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
                  {data.github.repo.commits.map((commit) => (
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
      <Route
        path="/html"
        exact={true}
        render={() => <TestQuery suffix="html" />}
      />
      <Route
        path="/failed"
        exact={true}
        render={() => <TestQuery suffix="failed" />}
      />
      <Route
        path="/blocked"
        exact={true}
        render={() => <TestQuery suffix="blocked" />}
      />
      <Route
        path="/erroneous"
        exact={true}
        render={() => <TestQuery suffix="erroneous" />}
      />
    </Switch>
  </>
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
