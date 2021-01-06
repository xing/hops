describe('graphql mock server without SSR', () => {
  let url;

  beforeAll(async () => {
    const { getUrl } = HopsCLI.start('--fast-dev');
    url = await getUrl();
  });

  it('requests data on the client & not on the server', async () => {
    const { page, getElementByText } = await createPage();
    const response = await page.goto(url, { waitUntil: 'networkidle2' });
    const html = await response.text();
    const loading = '<strong id="loading">loading...</strong>';

    expect(html.includes(loading)).toBe(true);
    await page.waitForSelector('p');
    expect(await getElementByText('Fetch No. 1')).toBeDefined();

    await page.close();
  });
});
