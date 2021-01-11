const { handleConsoleOutput } = require('../../../helpers');

describe('typescript-styled-components development server', () => {
  let url;

  beforeAll(async () => {
    const { getUrl } = HopsCLI.start('--fast-dev');
    url = await getUrl();
  });

  it('allows to use the css-props', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url, { waitUntil: 'networkidle2' });

    const color = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector('h1')).color;
    });
    expect(color).toBe('rgb(255, 0, 255)');

    await page.close();
  });
});
