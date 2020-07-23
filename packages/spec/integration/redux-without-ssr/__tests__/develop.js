const {
  hops: { arbitraryValue: configValue },
} = require('../package.json');

describe('redux development server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start('--fast-dev');
  });

  it('increments the counter on page load', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const count = await getInnerText('h1');

    expect(count).toBe('3');

    await page.close();
  });

  it('sets the config value on page load', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const count = await getInnerText('dd');

    expect(count).toBe(configValue);

    await page.close();
  });
});
