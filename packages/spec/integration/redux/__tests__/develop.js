const urlJoin = require('url-join');

describe('redux developmet server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start();
  });

  it('has default state', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const count = await getInnerText('counter');

    expect(count).toBe('0');

    await page.close();
  });

  it('increments the counter on click', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.click('button');
    await page.click('button');

    const count = await getInnerText('counter');

    expect(count).toBe('2');

    await page.close();
  });

  describe('route matching action creators', () => {
    it('will be executed if the route matches', async () => {
      const { page, getInnerText } = await createPage();
      await page.goto(urlJoin(url, '/increment'), {
        waitUntil: 'networkidle2',
      });

      const count = await getInnerText('counter');

      expect(count).toBe('1');

      await page.close();
    });

    it('will be executed if a search query or hash is present', async () => {
      const { page, getInnerText } = await createPage();
      await page.goto(urlJoin(url, '/increment?foo=bar#hash'), {
        waitUntil: 'networkidle2',
      });

      const count = await getInnerText('counter');

      expect(count).toBe('1');

      await page.close();
    });

    it('will be awaited if they are promises', async () => {
      const { page, getInnerText } = await createPage();
      await page.goto(urlJoin(url, '/increment-fetch'), {
        waitUntil: 'networkidle2',
      });

      const count = await getInnerText('counter');

      expect(count).toBe('42');

      await page.close();
    });

    it('will be provided with expected "param" string', async () => {
      const { page, getInnerText } = await createPage();
      await page.goto(urlJoin(url, '/param-test/foo'), {
        waitUntil: 'networkidle2',
      });

      const param = await getInnerText('value');

      expect(param).toBe('foo');

      await page.close();
    });

    it('will be provided with the expected "location" object', async () => {
      const { page, getInnerText } = await createPage();
      await page.goto(urlJoin(url, '/location-test?foo=bar'), {
        waitUntil: 'networkidle2',
      });

      const locationSearch = await getInnerText('value');

      expect(locationSearch).toBe('?foo=bar');

      await page.close();
    });

    it('will be provided with the expected "match" object', async () => {
      const { page, getInnerText } = await createPage();
      await page.goto(urlJoin(url, '/match-test/foobar'), {
        waitUntil: 'networkidle2',
      });

      const matchParam = await getInnerText('value');

      expect(matchParam).toBe('foobar');

      await page.close();
    });
  });
});
