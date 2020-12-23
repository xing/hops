const { HopsCLI } = require('../../../helpers/hops-cli');

describe('typescript development server', () => {
  let hopsCli;
  let url;

  beforeAll(async () => {
    hopsCli = HopsCLI.cmd('start').addArg('--fast-dev').run();
    url = await hopsCli.getUrl();
  });

  afterAll(() => {
    hopsCli.stop();
  });

  it('renders a simple jsx site', async () => {
    const { page } = await createPage();
    await page.goto(url);
    expect(await page.content()).toMatch('<h1>test</h1>');

    await page.close();
  });

  it('supports code-splitting', async () => {
    const { page } = await createPage();
    await page.goto(url);
    expect(await page.content()).toMatch('<p>lorem ipsum.</p>');

    await page.close();
  });
});
