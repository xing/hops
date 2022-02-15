const fetch = require('cross-fetch');
const urlJoin = require('url-join');
const { handleConsoleOutput } = require('../../../helpers');

describe('react development server', () => {
  let url;

  beforeAll(async () => {
    const { getUrl, hasFinished } = HopsCLI.start('--fast-dev');
    url = await getUrl();
    await hasFinished([
      "bundling 'develop' finished",
      "bundling 'node' finished",
    ]);
  });

  it('renders home', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url);
    expect(await page.content()).toMatch('<h1>home</h1>');

    await page.close();
  });

  it('renders another route', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(urlJoin(url, '/two'));
    expect(await page.content()).toMatch('<h1>two</h1>');

    await page.close();
  });

  it('allows to set status code with component', async () => {
    const response = await fetch(urlJoin(url, '/status'));
    expect(response.status).toBe(418);
  });

  it('redirects server-side', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    const response = await page.goto(urlJoin(url, '/redirect'));
    const firstPageResponse = response.request().redirectChain()[0].response();
    expect(firstPageResponse.status()).toBe(301);
    expect(firstPageResponse.headers()['location']).toBe('/two');

    await page.close();
  });

  it('allows to set status code with component', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    const response = await page.goto(urlJoin(url, '/header'));
    expect(response.headers()['x-foo']).toBe('Bar');

    await page.close();
  });

  it('returns 404 when no route matches', async () => {
    const response = await fetch(urlJoin(url, '/404'));
    expect(response.status).toBe(404);
  });

  it('allows to navigate client-side', async () => {
    const { page, getElementByText } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url);

    page.on('request', (request) => {
      if (request.isNavigationRequest()) {
        throw new Error('Router Link click should not trigger page navigation');
      }
    });

    await getElementByText('Link to two').then((e) => e.click());

    expect(await page.content()).toMatch('<h1>two</h1>');

    await page.close();
  });

  it.each(['hook', 'hoc'])(
    'passes server data through the %s',
    async (approach) => {
      const { page, getInnerText } = await createPage();
      page.on('console', (msg) => handleConsoleOutput(msg));
      await page.goto(urlJoin(url, `/server-data-${approach}`));

      const method = await getInnerText('output');
      expect(method).toBe('GET');

      await page.close();
    }
  );

  it('allows to use flow', async () => {
    const text = await fetch(urlJoin(url, '/flow')).then((r) => r.text());
    expect(text).toMatch('text:flow');
  });

  it('loads async Import component server-side', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.setJavaScriptEnabled(false);
    await page.goto(urlJoin(url, '/import'));

    expect(await page.content()).toMatch('imported');
    expect(await page.content()).toMatch(/Hello bold [^a-z]+text[^a-z]+!/);

    await page.close();
  });

  it('prints resource hints server-side', async () => {
    const { page, getProperty } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.setJavaScriptEnabled(false);
    await page.goto(urlJoin(url, '/import'));

    const preloadHref = await getProperty('href', 'link[rel="preload"]');
    const preloadAs = await getProperty('as', 'link[rel="preload"]');
    const prefetchHref = await getProperty('href', 'link[rel="prefetch"]');

    expect(preloadHref).toMatch(/\/fixture-react-[^.]+.js$/);
    expect(preloadAs).toBe('script');
    expect(prefetchHref).toMatch(/\/fixture-react-[^.]+.js$/);

    await page.close();
  });

  it('renders async Import component client-side', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(urlJoin(url, '/import'), { waitUntil: 'networkidle2' });

    expect(await page.content()).toMatch('imported');

    await page.close();
  });

  it.each(['hook', 'hoc'])('renders config with %s', async (approach) => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(urlJoin(url, `/config-${approach}`), {
      waitUntil: 'networkidle2',
    });

    expect(await page.content()).toMatch(`${approach}-test-value`);

    await page.close();
  });

  it('renders helmet <link> server-side', async () => {
    const response = await fetch(url);
    const content = await response.text();
    expect(content).toMatch('data:;base64,iVBORw0KGgo=');
  });

  it('renders images', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(urlJoin(url, '/images'), { waitUntil: 'networkidle2' });

    await expect(page.$$('img[src^="data:image/"]')).resolves.toHaveLength(2);
    await expect(page.$$('img[src$=".png"]')).resolves.toHaveLength(1);

    await page.close();
  });
});
