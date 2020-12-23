const { HopsCLI } = require('../../../helpers/hops-cli');

describe('graphql mock server', () => {
  let hopsCli;
  let url;

  beforeAll(async () => {
    hopsCli = HopsCLI.cmd('start').addArg('--fast-dev').run();
    url = await hopsCli.getUrl();
  });

  afterAll(() => {
    hopsCli.stop();
  });

  it('renders a mocked quote', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('p')).toBe('Hello World');

    await page.close();
  });

  it('renders an email through a custom resolver', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('cite')).toBe('email@example.com');

    await page.close();
  });
});
