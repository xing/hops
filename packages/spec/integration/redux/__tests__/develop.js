describe('redux developmet server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start();
  });

  it('has default state', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const count = await getInnerText('counter');

    expect(count).toBe('0');

    await page.close();
  });

  it('increments the counter on click', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.click('button');
    await page.click('button');

    const count = await getInnerText('counter');

    expect(count).toBe('2');

    await page.close();
  });

  it('executes route-matching action creators', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url + '/increment', { waitUntil: 'networkidle2' });

    const count = await getInnerText('counter');

    expect(count).toBe('1');

    await page.close();
  });

  it('executes route-matching action creators with fetch', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url + '/increment-fetch', { waitUntil: 'networkidle2' });

    const count = await getInnerText('counter');

    expect(count).toBe('42');

    await page.close();
  });

  it('executes route-matching action creators with url-params as their first argument', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url + '/param/foo', { waitUntil: 'networkidle2' });

    const param = await getInnerText('value');

    expect(param).toBe('foo');

    await page.close();
  });

  it('executes route-matching action creators with react-router-location as part of their second argument', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url + '/location-test', {
      waitUntil: 'networkidle2',
    });

    const param = await getInnerText('value');

    expect(param).toBe('/location-test');

    await page.close();
  });

  it('executes route-matching action creators with react-router-match as part of their second argument', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url + '/match-test/foobar', {
      waitUntil: 'networkidle2',
    });

    const param = await getInnerText('value');

    expect(param).toBe('foobar');

    await page.close();
  });
});
