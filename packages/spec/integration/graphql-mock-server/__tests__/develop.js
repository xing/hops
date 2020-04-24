describe('graphql mock server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start('--fast-dev');
  });

  it('renders a mocked quote', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('p')).toBe('Hello World');

    await page.close();
  });

  it('renders an email through a custom resolver', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('cite')).toBe('email@example.com');

    await page.close();
  });
});
