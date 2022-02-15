const { handleConsoleOutput } = require('../../../helpers');

describe('typescript development server', () => {
  let url;

  beforeAll(async () => {
    const { getUrl, hasFinished } = HopsCLI.start('--fast-dev');
    url = await getUrl();
    await hasFinished([
      "bundling 'develop' finished",
      "bundling 'node' finished",
    ]);
  });

  it('renders a simple jsx site', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url);
    expect(await page.content()).toMatch('<h1>test</h1>');

    await page.close();
  });

  it('supports code-splitting', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url);
    expect(await page.content()).toMatch('<p>lorem ipsum.</p>');

    await page.close();
  });
});
