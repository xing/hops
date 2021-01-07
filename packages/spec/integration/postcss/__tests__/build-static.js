const { handleConsoleOutput } = require('../../../helpers');

// Test to ensure  https://github.com/xing/hops/issues/761 has been fixed
describe('postcss production static build', () => {
  let url;

  beforeAll(async () => {
    const { getUrl } = HopsCLI.start('-ps');
    url = await getUrl();
  });

  it('styles when served in production mode', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url, { waitUntil: 'networkidle2' });

    const {
      position,
      fontFamily,
      textAlign,
      paddingTop,
      paddingLeft,
      borderRadius,
    } = await page.evaluate(() => {
      const {
        position,
        fontFamily,
        textAlign,
        paddingTop,
        paddingLeft,
        borderRadius,
      } = window.getComputedStyle(document.querySelector('h1'));
      return {
        position,
        fontFamily,
        textAlign,
        paddingTop,
        paddingLeft,
        borderRadius,
      };
    });

    expect(position).toBe('sticky');
    expect(fontFamily).toContain('-apple-system');
    expect(textAlign).toBe('center');
    expect(paddingTop).toBe('50px');
    expect(paddingLeft).toBe('38px');
    expect(borderRadius).toBe('100px');

    // there should be 2 stylesheets
    // the global animate.css and the css-modules import
    const stylesheets = await page.$$('link[rel=stylesheet]');
    expect(stylesheets).toHaveLength(2);

    await page.close();
  });
});
