describe('react developmet server', () => {
  let url;

  beforeAll(async () => {
    jest.setTimeout(30000);
    url = await HopsCLI.start();
  });

  it('renders home', async () => {
    const { page } = await createPage();
    await page.goto(url);
    expect(await page.content()).toMatch('<h1>home</h1>');

    await page.close();
  });

  it('renders another route', async () => {
    const { page } = await createPage();
    await page.goto(url + '/two');
    expect(await page.content()).toMatch('<h1>two</h1>');

    await page.close();
  });

  it('allows to set status code with component', async () => {
    const { page } = await createPage();
    const response = await page.goto(url + '/status');
    expect(response.status()).toBe(418);

    await page.close();
  });

  it('redirects server-side', async () => {
    const { page } = await createPage();
    const response = await page.goto(url + '/redirect');
    const firstPageResponse = response
      .request()
      .redirectChain()[0]
      .response();
    expect(firstPageResponse.status()).toBe(301);
    expect(firstPageResponse.headers()['location']).toBe('/two');

    await page.close();
  });

  it('allows to set status code with component', async () => {
    const { page } = await createPage();
    const response = await page.goto(url + '/header');
    expect(response.headers()['x-foo']).toBe('Bar');

    await page.close();
  });

  it('returns 404 when no route matches', async () => {
    const { page } = await createPage();
    const response = await page.goto(url + '/404');
    expect(response.status()).toBe(404);

    await page.close();
  });

  it('allows to navigate client-side', async () => {
    const { page, getElementByText } = await createPage();
    await page.goto(url);

    page.on('request', request => {
      if (request.isNavigationRequest()) {
        throw new Error('Router Link click should not trigger page navigation');
      }
    });

    await getElementByText('Link to two').then(e => e.click());

    expect(await page.content()).toMatch('<h1>two</h1>');

    await page.close();
  });

  it('passes server data through context', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url);

    const method = await getInnerText('output');
    expect(method).toBe('GET');

    await page.close();
  });

  it('allows to use flow', async () => {
    const { page } = await createPage();
    await page.goto(url + '/flow');

    expect(await page.content()).toMatch('text:flow');

    await page.close();
  });

  it('loads async Import component server-side', async () => {
    const { page } = await createPage();
    await page.setJavaScriptEnabled(false);
    await page.goto(url + '/import');

    expect(await page.content()).toMatch('imported');

    await page.close();
  });

  it('renders async Import component client-side', async () => {
    const { page } = await createPage();
    await page.goto(url + '/import', { waitUntil: 'networkidle2' });

    expect(await page.content()).toMatch('imported');

    await page.close();
  });
});
