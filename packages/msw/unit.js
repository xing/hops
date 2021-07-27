// @ts-check

const { setupServer } = require('msw/node');

let mockServer;

module.exports = {
  getMockServer() {
    if (mockServer) {
      return mockServer;
    }

    return (mockServer = setupServer());
  },
};
