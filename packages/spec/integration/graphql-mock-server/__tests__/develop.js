const { handleConsoleOutput } = require('../../../helpers');

describe('graphql mock server', () => {
  let url;

  beforeAll(async () => {
    const { getUrl, started } = HopsCLI.start('--fast-dev');
    url = await getUrl();
    await started();
  });

  it('renders a mocked quote', async () => {
    const { page, getInnerText } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('p')).toBe('Hello World');

    await page.close();
  });

  it('renders an email through a custom resolver', async () => {
    const { page, getInnerText } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('cite')).toBe('email@example.com');

    await page.close();
  });
});
