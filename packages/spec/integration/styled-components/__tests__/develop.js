const { HopsCLI } = require('../../../helpers/hops-cli');

describe('styled-components development server', () => {
  let hopsCli;
  let url;

  beforeAll(async () => {
    hopsCli = HopsCLI.cmd('start').addArg('--fast-dev').run();
    url = await hopsCli.getUrl();
  });

  afterAll(() => {
    hopsCli.stop();
  });

  it('allows to use styled components', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const position = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector('h1')).position;
    });
    expect(position).toBe('sticky');

    await page.close();
  });

  it('inlines styles into template', async () => {
    const { page } = await createPage();
    await page.setJavaScriptEnabled(false);
    await page.goto(url);

    const position = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector('h1')).position;
    });
    expect(position).toBe('sticky');

    await page.close();
  });
});
