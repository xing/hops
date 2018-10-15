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
});
