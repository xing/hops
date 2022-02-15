const { handleConsoleOutput } = require('../../../helpers');

describe('redux development server', () => {
  let url;

  beforeAll(async () => {
    const { getUrl, hasFinished } = HopsCLI.start('--fast-dev');
    url = await getUrl();
    await hasFinished([
      "bundling 'develop' finished",
      "bundling 'node' finished",
    ]);
  });

  it('increments the counter on page load', async () => {
    const { page, getInnerText } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url, { waitUntil: 'networkidle2' });

    const count = await getInnerText('h1');

    expect(count).toBe('3');

    await page.close();
  });
});
