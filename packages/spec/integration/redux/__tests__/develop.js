describe('redux developmet server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start();
  });

  it('has default state', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const count = await getInnerText('output');

    expect(count).toBe('0');

    await page.close();
  });

  it('increments the counter on click', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.click('button');
    await page.click('button');

    const count = await getInnerText('output');

    expect(count).toBe('2');

    await page.close();
  });

  it('executes route-matching action creators', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url + '/increment', { waitUntil: 'networkidle2' });

    const count = await getInnerText('output');

    expect(count).toBe('1');

    await page.close();
  });

  it('executes route-matching action creators with fetch', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url + '/increment-fetch', { waitUntil: 'networkidle2' });

    const count = await getInnerText('output');

    expect(count).toBe('42');

    await page.close();
  });
});
