/**
 * @jest-hops-puppeteer off
 */

const fetch = require('cross-fetch');

describe('graphql development client', () => {
  let url;

  beforeAll(async () => {
    const { getUrl, hasFinished } = HopsCLI.start('--fast-dev');
    url = await getUrl();
    await hasFinished([
      "bundling 'develop' finished",
      "bundling 'node' finished",
    ]);
  });

  describe('/invalid-response (HTML)', () => {
    it('should render a 500 error page for an invalid status 200 response', async () => {
      const response = await fetch(`${url}invalid-response`);
      const text = await response.text();

      expect(response.status).toBe(500);
      expect(text).toContain(
        '<b>ServerParseError: Unexpected token &lt; in JSON at position 0'
      );
      expect(text).toContain('&lt;h1&gt;Moini!&lt;/h1&gt;');
    });
  });

  describe('/blocked', () => {
    it('should render a 500 error page for status 429 response', async () => {
      const response = await fetch(`${url}blocked`);
      const text = await response.text();

      expect(response.status).toBe(500);
      expect(text).toContain(
        '<b>ServerParseError: Unexpected token T in JSON at position 0'
      );
      expect(text).toContain('Too many requests');
    });
  });

  describe('/query-error', () => {
    it('should render a 500 error page for status 400 response', async () => {
      const response = await fetch(`${url}query-error`);
      const text = await response.text();

      expect(response.status).toBe(500);
      expect(text).toContain(
        '<b>Response not successful: Received status code 400'
      );
    });
  });

  describe('/resolve-error', () => {
    describe('errorPolicy: all', () => {
      it('should render a status 200 page with the GraphQL error', async () => {
        const response = await fetch(`${url}resolve-error?errorPolicy=all`);
        const text = await response.text();

        expect(response.status).toBe(200);
        expect(text).toContain('<b>Could not resolve fields');
      });
    });

    describe('errorPolicy: none', () => {
      it('should render a status 500 error page', async () => {
        const response = await fetch(`${url}resolve-error?errorPolicy=none`);
        const text = await response.text();

        expect(response.status).toBe(500);
        expect(text).toContain('<b>Could not resolve fields');
      });
    });
  });
});
