// @ts-check

const { setupServer } = require('msw/node');
const { graphql, rest } = require('msw');

module.exports = {
  mockServer: setupServer(),
  graphql,
  rest,
};
