const { HopsCLI } = require('../../../helpers/hops-cli');

describe('typescript-styled-components development server', () => {
  let hopsCli;
  let url;

  beforeAll(async () => {
    hopsCli = HopsCLI.cmd('start').addArg('--fast-dev').run();
    url = await hopsCli.getUrl();
  });

  afterAll(() => {
    hopsCli.stop();
  });

  it('allows to use the css-props', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const color = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector('h1')).color;
    });
    expect(color).toBe('rgb(255, 0, 255)');

    await page.close();
  });
});
