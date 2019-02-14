import gql from 'graphql-tag';
import { render } from 'hops';
import React from 'react';
import { Query } from 'react-apollo';

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

export default render(
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
  </Query>,

  {
    graphql: {
      resolvers: {
        Query: {
          showCommits() {
            return true;
          },
        },
      },
    },
  }
);
