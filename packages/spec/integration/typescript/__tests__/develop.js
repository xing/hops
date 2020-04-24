describe('typescript development server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start('--fast-dev');
  });

  it('renders a simple jsx site', async () => {
    const { page } = await createPage();
    await page.goto(url);
    expect(await page.content()).toMatch('<h1>test</h1>');

    await page.close();
  });

  it('supports code-splitting', async () => {
    const { page } = await createPage();
    await page.goto(url);
    expect(await page.content()).toMatch('<p>lorem ipsum.</p>');

    await page.close();
  });
});
