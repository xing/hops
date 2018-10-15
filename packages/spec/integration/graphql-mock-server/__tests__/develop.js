describe('graphql development server', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start();
  });

  it('renders the viewer username', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('#username')).toBe('mocked name');

    await page.close();
  });

  it('renders the viewer avatar image', async () => {
    const { page, getProperty } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getProperty('src', '#avatar')).toBe('https://mocked.com/');

    await page.close();
  });

  it('renders a list of custom scalar types', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('#dates')).toBe(
      '2018-08-31T12:23:18.530Z\n2018-07-31T12:23:18.530Z'
    );

    await page.close();
  });

  it('renders a list of custom interface types', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('#persons')).toBe('John Doe\nMax Mustermann');

    await page.close();
  });

  it('renders a list of custom union type', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('#searchPersons')).toBe('Account\nContact');

    await page.close();
  });

  it('renders a list of custom union type using filter args and enums', async () => {
    const { page, getInnerText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    expect(await getInnerText('#searchPersonsByFilter')).toBe('Account');

    await page.close();
  });

  it('renders success after mutation', async () => {
    const { page, getInnerText, getElementByText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const successBtn = await getElementByText('Do Something Right!');
    await successBtn.click();

    await page.waitForResponse(`${url}/graphql`);
    expect(await getInnerText('#mutation-result-success')).toBe(
      '{"id":"xyz","name":"Empty-Hello","__typename":"Something"}'
    );

    await page.close();
  });

  it('renders error after mutation', async () => {
    const { page, getInnerText, getElementByText } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const errorBtn = await getElementByText('Do Something Wrong!');
    await errorBtn.click();

    await page.waitForResponse(`${url}/graphql`);
    expect(await getInnerText('#mutation-result-error')).toBe(
      '{"message":"mock","code":"mock","something":{"id":"xyz","name":"Empty-Hello","__typename":"Something"},"__typename":"DoSomethingError"}'
    );

    await page.close();
  });
});
