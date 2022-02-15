const fs = require('fs');
const path = require('path');
const { handleConsoleOutput } = require('../../../helpers');

describe('pwa production build', () => {
  let url;

  beforeAll(async () => {
    const { getUrl, started } = HopsCLI.start('-p');
    url = await getUrl();
    await started();
  });

  it('registers a service worker', async () => {
    const { page } = await createPage();
    page.on('console', (msg) => handleConsoleOutput(msg));
    await page.goto(url, { waitUntil: 'networkidle2' });

    // wait until service worker is installed
    await page.evaluate('navigator.serviceWorker.ready');

    // save all requests during the second visit
    const requests = new Map();
    page.on('request', (req) => {
      requests.set(req.url(), req);
    });

    await page.reload({ waitUntil: 'networkidle2' });

    // page should now be controlled by a service worker
    expect(
      await page.evaluate('navigator.serviceWorker.controller')
    ).not.toBeNull();

    // all responses should now come from the service worker
    expect(
      Array.from(requests.values()).map((r) => r.response().fromServiceWorker())
    ).toEqual([true, true]);

    await page.close();
  });

  it('generates webmanifest and references images', async () => {
    const distDir = path.join(cwd, 'dist');
    const distFiles = fs.readdirSync(distDir);
    const manifestFile = distFiles.find((file) =>
      file.endsWith('.webmanifest')
    );
    const {
      icons: [{ src: icon }],
    } = JSON.parse(fs.readFileSync(path.join(distDir, manifestFile), 'utf-8'));
    const hasIconFile =
      typeof distFiles.find((file) => icon.includes(file)) !== 'undefined';
    expect(hasIconFile).toBe(true);
  });
});
