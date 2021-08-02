// @ts-check

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

module.exports = {
  mockGraphQLQuery,
  mockGraphQLMutation,

  mockGetRequest,
  mockPostRequest,
  mockPutRequest,
  mockDeleteRequest,
};
