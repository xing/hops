// @ts-check

const { fetch } = require('cross-fetch');

const getMockEndpoint = (pathName) => {
  if (typeof process.env.MOCK_HOST !== 'string') {
    throw new Error('Please define MOCK_HOST.');
  }

  return new URL(pathName, process.env.MOCK_HOST).toString();
};

/** @type {import('hops-msw/integration').mockGraphQLQuery} */
const mockGraphQLQuery = (operationName, data) => {
  return {
    type: 'graphql',
    method: 'query',
    identifier: operationName,
    data,
  };
};

/** @type {import('hops-msw/integration').mockGraphQLMutation} */
const mockGraphQLMutation = (operationName, data) => {
  return {
    type: 'graphql',
    method: 'mutation',
    identifier: operationName,
    data,
  };
};

/** @type {import('hops-msw/integration').mockGetRequest} */
const mockGetRequest = (pathName, data) => {
  return {
    type: 'rest',
    method: 'get',
    identifier: pathName,
    data,
  };
};

/** @type {import('hops-msw/integration').mockPostRequest} */
const mockPostRequest = (pathName, data) => {
  return {
    type: 'rest',
    method: 'post',
    identifier: pathName,
    data,
  };
};

/** @type {import('hops-msw/integration').mockPutRequest} */
const mockPutRequest = (pathName, data) => {
  return {
    type: 'rest',
    method: 'put',
    identifier: pathName,
    data,
  };
};

/** @type {import('hops-msw/integration').mockDeleteRequest} */
const mockDeleteRequest = (pathName, data) => {
  return {
    type: 'rest',
    method: 'delete',
    identifier: pathName,
    data,
  };
};

/** @type {import('hops-msw/integration').registerServerMocks} */
const registerServerMocks = async (...mocks) => {
  await fetch(getMockEndpoint('/_mocks/register'), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ mocks }),
  });
};

/** @type {import('hops-msw/integration').resetServerMocks} */
const resetServerMocks = async () => {
  await fetch(getMockEndpoint('/_mocks/reset'));
};

module.exports = {
  mockGraphQLQuery,
  mockGraphQLMutation,

  mockGetRequest,
  mockPostRequest,
  mockPutRequest,
  mockDeleteRequest,

  registerServerMocks,
  resetServerMocks,
};
