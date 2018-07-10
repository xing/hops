describe('typescript developmet server', () => {
  let url;

  beforeAll(async () => {
    jest.setTimeout(30000);
    url = await HopsCLI.develop();
  });

  it('renders a simple jsx site', async () => {
    const { page } = await createPage();
    await page.goto(url);
    expect(await page.content()).toMatch('<h1>test</h1>');

    await page.close();
  });
});
