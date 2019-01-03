// Test to ensure  https://github.com/xing/hops/issues/761 has been fixed
describe('postcss production static build', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start('-ps');
  });

  it('styles when served in production mode', async () => {
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

    const stylesheet = await page.$('link[rel=stylesheet]');
    expect(stylesheet).not.toBeNull();

    await page.close();
  });
});
