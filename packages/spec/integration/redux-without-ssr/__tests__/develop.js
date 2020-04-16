describe('redux development server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start();
  });

  it('increments the counter on page load', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const count = await getInnerText('h1');

    expect(count).toBe('3');

    await page.close();
  });
});
