const { getMockServer } = require('hops-msw/unit');

let client;

beforeAll(async () => {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const { createTestClient } = await import('hops-react-apollo');
    client = createTestClient();
  } catch {
    // we don't have hops-react-apollo installed and won't create a client
  }

  getMockServer().listen();
});

afterEach(async () => {
  if (client) {
    await client.clearStore();
  }

  getMockServer().resetHandlers();
});

afterAll(() => {
  getMockServer().close();
});
