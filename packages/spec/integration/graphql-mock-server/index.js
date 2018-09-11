import gql from 'graphql-tag';
import { render } from 'hops-react';
import React, { Fragment as F } from 'react';
import { Query, Mutation } from 'react-apollo';

const query = gql`
  query Viewer {
    somethingConnection(first: 10) {
      total
      edges {
        cursor
        node {
          id
          name
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
    something {
      id
      name
    }
    searchPersons {
      __typename
    }
    searchPersonsByFilter: searchPersons(filter: { type: ACCOUNT }) {
      __typename
    }
    persons {
      ... on Account {
        id
        name
        login
      }
      ... on Contact {
        id
        name
        phone
      }
    }
    myDates
    version
    me {
      name
      avatarUrl
    }
    viewer {
      name
      address {
        street
        city
      }
    }
  }
`;

const mutation = gql`
  mutation DoSomething($input: DoSomethingInput!) {
    doSomething(input: $input) {
      error {
        message
        code
        something {
          id
          name
        }
      }
      success {
        id
        name
      }
    }
  }
`;

export default render(
  <Query query={query}>
    {({
      loading,
      error,
      data: {
        something = {},
        somethingConnection = {},
        me: { avatarUrl } = {},
        myDates = [],
        persons = [],
        searchPersons = [],
        searchPersonsByFilter = [],
        viewer: { name: username, address: { city } = {} } = {},
      } = {},
    }) => {
      if (loading) return <strong id="loading">loading...</strong>;
      if (error)
        return (
          <strong id="error">
            Error: {error.message}
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </strong>
        );
      return (
        <F>
          {avatarUrl && <img id="avatar" src={avatarUrl} width={50} />}
          <hr />
          {username && <h1 id="username">{username}</h1>}
          <hr />
          {city && <div id="city">{city}</div>}
          <hr />
          {myDates && (
            <div id="dates">
              {myDates.map((date, i) => (
                <div key={i}>{date}</div>
              ))}
            </div>
          )}
          <hr />
          {persons && (
            <div id="persons">
              {persons.map(({ id, name }) => (
                <div key={id}>{name}</div>
              ))}
            </div>
          )}
          <hr />
          {searchPersons && (
            <div id="searchPersons">
              {searchPersons.map(({ __typename }, idx) => (
                <div key={idx}>{__typename}</div>
              ))}
            </div>
          )}
          <hr />
          {searchPersonsByFilter && (
            <div id="searchPersonsByFilter">
              {searchPersonsByFilter.map(({ __typename }, idx) => (
                <div key={idx}>{__typename}</div>
              ))}
            </div>
          )}
          <hr />
          <div>
            <Mutation mutation={mutation}>
              {(
                doSomething,
                { loading, data: { doSomething: { success, error } = {} } = {} }
              ) => {
                return (
                  <div>
                    <button
                      disabled={loading}
                      onClick={() =>
                        doSomething({ variables: { input: { name: 'Hello' } } })
                      }
                    >
                      Do Something Right!
                    </button>
                    <button
                      disabled={loading}
                      onClick={() =>
                        doSomething({ variables: { input: { name: 'Wrong' } } })
                      }
                    >
                      Do Something Wrong!
                    </button>
                    {loading && <span>loading...</span>}
                    <hr />
                    <strong>Query/Cache result</strong>
                    <pre id="query-cache-result">
                      {JSON.stringify(something, null, 2)}
                    </pre>
                    <strong>Mutation success result</strong>
                    <pre id="mutation-result-success">
                      {JSON.stringify(success)}
                    </pre>
                    <strong>Mutation error result</strong>
                    <pre id="mutation-result-error">
                      {JSON.stringify(error)}
                    </pre>
                  </div>
                );
              }}
            </Mutation>
          </div>
          <hr />
          <div>
            <h1>Pagination</h1>
            <div>Total: {somethingConnection.total}</div>
            <div>HasNextPage: {somethingConnection.pageInfo.hasNextPage}</div>
            <div>
              HasPreviousPage: {somethingConnection.pageInfo.hasPreviousPage}
            </div>
            <div>StartCursor: {somethingConnection.pageInfo.startCursor}</div>
            <div>EndCursor: {somethingConnection.pageInfo.endCursor}</div>
            <ul>
              {
                <div id="somethingConnection">
                  {somethingConnection.edges.map(({ node: { id, name } }) => (
                    <li key={id}>{name}</li>
                  ))}
                </div>
              }
            </ul>
          </div>
          <hr />
        </F>
      );
    }}
  </Query>
);
