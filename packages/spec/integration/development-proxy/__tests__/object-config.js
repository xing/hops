const fs = require('fs');
const path = require('path');
const fetch = require('cross-fetch');
const urlJoin = require('url-join');

const PORT = 8998;

describe('development proxy object config', () => {
  let url;

  beforeAll(async () => {
    const packageJsonPath = path.join(global.cwd, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
    packageJson.hops.port = PORT;

    packageJson.hops.proxy = {
      '/dmbch': { target: `http://localhost:${PORT}/proxy` },
      '/zaubernerd': { target: `http://localhost:${PORT}/proxy2` },
      '/proxy-req': { target: `http://localhost:${PORT}/req` },
      '/proxy-res': { target: `http://localhost:${PORT}/res` },
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    url = await HopsCLI.start();
  });

  it('proxies with proxy config set as object', async () => {
    expect(await fetch(urlJoin(url, '/dmbch')).then(r => r.text())).toBe(
      'proxy:dmbch'
    );
    expect(await fetch(urlJoin(url, '/zaubernerd')).then(r => r.text())).toBe(
      'proxy2:zaubernerd'
    );
  });

  it('allows to hook into onProxyReq', async () => {
    const content = await fetch(urlJoin(url, '/proxy-req')).then(r => r.text());
    expect(content).toBe('onProxyReq');
  });

  it('allows to hook into onProxyRes', async () => {
    const content = await fetch(urlJoin(url, '/proxy-res')).then(r => r.text());
    expect(content).toBe('onProxyRes');
  });
});
