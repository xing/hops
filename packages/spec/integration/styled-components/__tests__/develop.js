describe('styled-components development server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start('--fast-dev');
  });

  it('allows to use styled components', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const position = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector('h1')).position;
    });
    expect(position).toBe('sticky');

    await page.close();
  });

  it('inlines styles into template', async () => {
    const { page } = await createPage();
    await page.setJavaScriptEnabled(false);
    await page.goto(url);

    const position = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector('h1')).position;
    });
    expect(position).toBe('sticky');

    await page.close();
  });
});
