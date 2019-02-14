import gql from 'graphql-tag';
import { render } from 'hops';
import React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  query testQuery {
    chirpById(id: "fakeChirpId") {
      text
      author {
        email
      }
    }
  }
`;

export default render(
  <Query query={query}>
    {({ loading, error, data: { chirpById } = {} }) => {
      if (loading) return <strong id="loading">loading...</strong>;
      if (error)
        return (
          <strong id="error">
            Error: {error.message}
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </strong>
        );
      return (
        <div>
          <blockquote>
            <p>{chirpById.text}</p>
            <footer>
              by <cite>{chirpById.author.email}</cite>
            </footer>
          </blockquote>
        </div>
      );
    }}
  </Query>
);
