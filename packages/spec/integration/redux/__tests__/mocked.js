const urlJoin = require('url-join');
const {
  mockGetRequest,
  registerServerMocks,
  resetServerMocks,
} = require('hops-msw/integration');
const { handleConsoleOutput } = require('../../../helpers');

describe('development server with msw mocks', () => {
  let url;

  beforeAll(async () => {
    const { getUrl } = HopsCLI.start(
      {
        ENABLE_MSW: 'true',
        PORT: '8949',
      },
      '--fast-dev'
    );
    url = await getUrl();
    process.env.MOCK_HOST = url;
  });

  afterEach(async () => {
    await resetServerMocks();
  });

  describe('Adding up to 12', () => {
    let page;

    beforeEach(async () => {
      await registerServerMocks(
        mockGetRequest(urlJoin(url, '/api'), { value: 5 })
      );
    });

    afterEach(async () => {
      if (page) {
        await page.evaluate(() => {
          window.hopsMswMocksReset();
        });
        await page.close();
      }
    });

    it('will show the mocked counter values 5 and 12', async () => {
      const { getInnerText, getElementByText, ...result } = await createPage();
      page = result.page;
      page.on('console', (msg) => handleConsoleOutput(msg));
      await page.goto(urlJoin(url, '/increment-fetch'), {
        waitUntil: 'networkidle2',
      });
      await page.evaluate((mock) => {
        window.hopsMswMocks = window.hopsMswMocks || [];
        window.hopsMswMocks.push(mock);
      }, mockGetRequest('/api', { value: 7 }));

      await expect(getInnerText('counter')).resolves.toBe('5');

      const btn = await getElementByText('async +');

      await btn.click();

      await page.waitForFunction(
        () => document.querySelector('counter').textContent === '12',
        { timeout: 2000 }
      );
    });
  });

  describe('Adding up to 40', () => {
    let page;

    beforeEach(async () => {
      await registerServerMocks(
        mockGetRequest(urlJoin(url, '/api'), { value: 13 })
      );
    });

    afterEach(async () => {
      if (page) {
        await page.evaluate(() => {
          window.hopsMswMocksReset();
        });
        await page.close();
      }
    });

    it('will show the mocked counter values 13 and 40', async () => {
      const { getInnerText, getElementByText, ...result } = await createPage();
      page = result.page;
      page.on('console', (msg) => handleConsoleOutput(msg));
      await page.goto(urlJoin(url, '/increment-fetch'), {
        waitUntil: 'networkidle2',
      });
      await page.evaluate((mock) => {
        window.hopsMswMocks = window.hopsMswMocks || [];
        window.hopsMswMocks.push(mock);
      }, mockGetRequest('/api', { value: 27 }));

      await expect(getInnerText('counter')).resolves.toBe('13');

      const btn = await getElementByText('async +');

      await btn.click();

      await page.waitForFunction(
        () => document.querySelector('counter').textContent === '40',
        { timeout: 2000 }
      );
    });
  });
});
