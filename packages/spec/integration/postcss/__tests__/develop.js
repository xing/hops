describe('react-postcss', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start('--fast-dev');
  });

  it('styles when served in development mode', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const { position, fontFamily } = await page.evaluate(() => {
      const { position, fontFamily } = window.getComputedStyle(
        document.querySelector('h1')
      );
      return { position, fontFamily };
    });

    expect(position).toBe('sticky');
    expect(fontFamily).toContain('-apple-system');

    const stylesheet = await page.$('link[rel=stylesheet],style');
    expect(stylesheet).not.toBeNull();

    await page.close();
  });

  it('does not add css file to template', async () => {
    const { page } = await createPage();
    await page.setJavaScriptEnabled(false);

    await page.goto(url, { waitUntil: 'networkidle2' });

    const stylesheet = await page.$('link[rel=stylesheet],style');
    expect(stylesheet).toBeNull();

    await page.close();
  });

  it('supports global un-hashed CSS classnames', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const { backgroundColor, animationDuration } = await page.evaluate(() => {
      const { backgroundColor, animationDuration } = window.getComputedStyle(
        document.querySelector('h1')
      );
      return { backgroundColor, animationDuration };
    });

    expect(backgroundColor).toBe('rgb(255, 0, 255)');
    expect(animationDuration).toBe('1s');
  });
});
