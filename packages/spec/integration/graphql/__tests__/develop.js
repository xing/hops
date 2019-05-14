const fetch = require('cross-fetch');
const { endpoints } = require('../mixin.core');

describe('graphql development client', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start();
  });

  it('renders a list of commits', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#commits', { timeout: 10000 });
    await page.close();
  });

  describe('/html', () => {
    it('should render a 406 error page for a status 200 response', async () => {
      const response = await fetch(`${url}html`);
      const text = await response.text();

      expect(response.status).toBe(406);
      expect(text).toContain('<pre>Error: Not Acceptable');
    });
  });

  describe('/erroneous', () => {
    describe('errorPolicy: all', () => {
      it('should render a GraphQL error', async () => {
        const response = await fetch(`${url}erroneous?errorPolicy=all`);
        const text = await response.text();

        expect(response.status).toBe(200);
        expect(text).toContain('<b>GraphQL error: Could not resolve fields');
      });
    });

    describe('errorPolicy: none', () => {
      it('should render an error page', async () => {
        const response = await fetch(`${url}erroneous?errorPolicy=none`);
        const text = await response.text();

        expect(response.status).toBe(500);
        expect(text).toContain(
          '<pre>Error: GraphQL error: Could not resolve fields'
        );
      });
    });
  });

  describe('/failed', () => {
    it('should render a 400 error page', async () => {
      const response = await fetch(`${url}failed`);
      const text = await response.text();

      expect(response.status).toBe(400);
      expect(text).toContain('<pre>Error: Bad Request');
    });
  });

  describe.each(endpoints)('/%s => %s', (status, message, headers = {}) => {
    it(`should respond with a ${status} error page`, async () => {
      const response = await fetch(`${url}${status}`);
      const text = await response.text();

      expect(response.status).toBe(status);
      expect(text).toContain(`<pre>Error: ${message}`);

      Object.entries(headers).forEach(([key, value]) =>
        expect(response.headers.get(key)).toBe(value)
      );
    });
  });
});
