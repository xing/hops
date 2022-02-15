const { handleConsoleOutput } = require('../../../helpers');

describe('esbuild - develop', () => {
  let url, page, getInnerText;

  beforeAll(async () => {
    const { getUrl, started } = HopsCLI.start(
      '--fast-dev',
      '--experimental-esbuild'
    );
    url = await getUrl();
    await started();

    const pptr = await createPage();
    page = pptr.page;
    getInnerText = pptr.getInnerText;

    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url, { waitUntil: 'networkidle2' });
  });

  afterAll(async () => {
    await page.close();
  });

  it('should show the heading', async () => {
    await expect(getInnerText('h1')).resolves.toBe('Hello ESBuild!');
  });

  it('should have the correct colors', async () => {
    const { color, backgroundColor } = await page.evaluate(() => {
      const { color, backgroundColor } = document.querySelector('h1').style;

      return { color, backgroundColor };
    });

    expect(color).toBe('papayawhip');
    expect(backgroundColor).toBe('fuchsia');
  });
});
