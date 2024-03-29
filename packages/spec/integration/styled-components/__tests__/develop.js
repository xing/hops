const { handleConsoleOutput } = require('../../../helpers');

describe('styled-components development server', () => {
  let url;

  beforeAll(async () => {
    const { getUrl, hasFinished } = HopsCLI.start('--fast-dev');
    url = await getUrl();
    await hasFinished([
      "bundling 'develop' finished",
      "bundling 'node' finished",
    ]);
  });

  it('allows to use styled components', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url, { waitUntil: 'networkidle2' });

    const position = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector('h1')).position;
    });
    expect(position).toBe('sticky');

    await page.close();
  });

  it('inlines styles into template', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.setJavaScriptEnabled(false);
    await page.goto(url);

    const position = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector('h1')).position;
    });
    expect(position).toBe('sticky');

    await page.close();
  });
});
