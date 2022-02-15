const { mockGetRequest } = require('hops-msw/integration');
const { handleConsoleOutput } = require('../../../helpers');

// Create your own functions to register / reset browser and server
// mocks.
// Registering server mocks means:
// - any API calls on the server-side will be mocked by whatever you
//   provide
// - the browser will then stop rendering until browser mocks are
//   registered or `window.hopsMswMocksRegistered` is set to true
async function registerServerMocks(page, baseUrl, ...mocks) {
  await page.evaluate(
    (baseUrl, mocks) => {
      return fetch(new URL('/_msw/register', baseUrl).toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mocks }),
      });
    },
    baseUrl,
    mocks
  );
}

// Registering browser mocks means:
// - the browser will interrupt client-side rendering until mocks are
//   registered or `window.hopsMswMocksRegistered` is set to true
// - these mocks will then be passed to the mock-service-worker service
//   worker and be evaluated in the browser
async function registerBrowserMocks(page, ...mocks) {
  await page.evaluate((mocks) => {
    window.hopsMswMocks = window.hopsMswMocks || [];

    if (mocks.length) {
      window.hopsMswMocks.push(...mocks);
    } else if (!window.hopsMswMocksReady) {
      window.hopsMswMocksRegistered = true;
    } else {
      window.hopsMswMocksReady();
    }
  }, mocks);
}

// Reset the server mocks if you don't want the browser to interrupt
// the rendering process anymore
async function resetServerMocks(page, baseUrl) {
  await page.evaluate(
    (baseUrl) => fetch(new URL('/_msw/reset', baseUrl).toString()),
    baseUrl
  );
}

// Reset the browser mocks if you don't want mock-service-worker to
// intercept client-side network calls anymore
async function resetBrowserMocks(page) {
  await page.evaluate(() => {
    window.hopsMswMocksReset();
  });
}

// A good way to remove the complexity of browser/server mocks would be
// to create a helper function such as:
// `visitPageWithMocks(page, url, ...mocks)`
// which first registers server mocks, then visits the page and then
// registers the browser mocks to continue rendering

describe('development server with msw mocks', () => {
  let baseUrl;

  beforeAll(async () => {
    const { getUrl, started } = HopsCLI.start(
      {
        ENABLE_MSW: 'true',
        PORT: '8949',
      },
      '--fast-dev'
    );
    baseUrl = await getUrl();
    await started();
  });

  describe('Adding up to 12', () => {
    let page;
    let getInnerText;
    let getElementByText;

    beforeEach(async () => {
      const pptr = await createPage();
      page = pptr.page;
      getInnerText = pptr.getInnerText;
      getElementByText = pptr.getElementByText;

      page.on('console', (msg) => handleConsoleOutput(msg));

      registerServerMocks(
        page,
        baseUrl,
        mockGetRequest(new URL('/api', baseUrl).toString(), { value: 5 })
      );
    });

    afterEach(async () => {
      if (page) {
        await resetServerMocks(page, baseUrl);
        await resetBrowserMocks(page);
        await page.close();
      }
    });

    it('will show the mocked counter values 5 and 12', async () => {
      await page.goto(new URL('/increment-fetch', baseUrl).toString(), {
        waitUntil: 'networkidle2',
      });

      await registerBrowserMocks(page, mockGetRequest('/api', { value: 7 }));

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
    let getInnerText;
    let getElementByText;

    beforeEach(async () => {
      const pptr = await createPage();
      page = pptr.page;
      getInnerText = pptr.getInnerText;
      getElementByText = pptr.getElementByText;

      page.on('console', (msg) => handleConsoleOutput(msg));

      await registerServerMocks(
        page,
        baseUrl,
        mockGetRequest(new URL('/api', baseUrl).toString(), { value: 13 })
      );
    });

    afterEach(async () => {
      if (page) {
        await resetServerMocks(page, baseUrl);
        await resetBrowserMocks(page);
        await page.close();
      }
    });

    it('will show the mocked counter values 13 and 40', async () => {
      await page.goto(new URL('/increment-fetch', baseUrl).toString(), {
        waitUntil: 'networkidle2',
      });

      await registerBrowserMocks(page, mockGetRequest('/api', { value: 27 }));

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
