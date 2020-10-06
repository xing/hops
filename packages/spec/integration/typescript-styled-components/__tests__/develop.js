describe('typescript-styled-components development server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start('--fast-dev');
  });

  it('allows to use the css-props', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const color = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector('h1')).color;
    });
    expect(color).toBe('rgb(255, 0, 255)');

    await page.close();
  });
});
