const { HopsCLI } = require('../../../helpers/hops-cli');

describe('redux development server', () => {
  let hopsCli;
  let url;

  beforeAll(async () => {
    hopsCli = HopsCLI.cmd('start').addArg('--fast-dev').run();
    url = await hopsCli.getUrl();
  });

  afterAll(() => {
    hopsCli.stop();
  });

  it('increments the counter on page load', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const count = await getInnerText('h1');

    expect(count).toBe('3');

    await page.close();
  });
});
