// Test to ensure  https://github.com/xing/hops/issues/761 has been fixed
describe('postcss production static build', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start('-ps');
  });

  it('styles when served in production mode', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const {
      position,
      fontFamily,
      textAlign,
      paddingTop,
      paddingLeft,
    } = await page.evaluate(() => {
      const {
        position,
        fontFamily,
        textAlign,
        paddingTop,
        paddingLeft,
      } = window.getComputedStyle(document.querySelector('h1'));
      return { position, fontFamily, textAlign, paddingTop, paddingLeft };
    });

    expect(position).toBe('sticky');
    expect(fontFamily).toContain('-apple-system');
    expect(textAlign).toBe('center');
    expect(paddingTop).toBe('50px');
    expect(paddingLeft).toBe('27.4285px');
    // todo: add expectation for c-arrow class

    // there should be 2 stylesheets
    // the global animate.css and the css-modules import
    const stylesheets = await page.$$('link[rel=stylesheet]');
    expect(stylesheets).toHaveLength(2);

    await page.close();
  });
});
