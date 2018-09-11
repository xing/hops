const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const PORT = 8998;

describe('development proxy object config', () => {
  let url;

  beforeAll(async () => {
    jest.setTimeout(30000);

    const packageJsonPath = path.join(global.cwd, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
    packageJson.hops.port = PORT;

    packageJson.hops.proxy = {
      '/dmbch': { target: `http://localhost:${PORT}/proxy` },
      '/zaubernerd': { target: `http://localhost:${PORT}/proxy2` },
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    url = await HopsCLI.start();
  });

  it('proxies with proxy config set as object', async () => {
    expect(await fetch(url + '/dmbch').then(r => r.text())).toBe('proxy:dmbch');
    expect(await fetch(url + '/zaubernerd').then(r => r.text())).toBe(
      'proxy2:zaubernerd'
    );
  });
});
