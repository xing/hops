const { handleConsoleOutput } = require('../../../helpers');

describe('postcss production build', () => {
  let url;

  beforeAll(async () => {
    const { getUrl, started } = HopsCLI.start('-p');
    url = await getUrl();
    await started();
  });

  it('styles when served in production mode', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
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

  it('adds css file to server side render HTML', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.setJavaScriptEnabled(false);

    await page.goto(url, { waitUntil: 'networkidle2' });

    const stylesheet = await page.$('link[rel=stylesheet]');
    expect(stylesheet).not.toBeNull();

    await page.close();
  });

  it('supports global un-hashed CSS classnames', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));

    await page.setJavaScriptEnabled(false);
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
