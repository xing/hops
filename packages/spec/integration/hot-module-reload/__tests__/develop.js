const fs = require('fs');
const path = require('path');
const { HopsCLI } = require('../../../helpers/hops-cli');

function changeFile(id) {
  const content = `
  import { render } from 'hops';
  import React from 'react';
  export default render(<h1 id="${id}">hello</h1>);
  `;

  fs.writeFileSync(path.join(global.cwd, 'index.js'), content);
}

// This test has been skipped, because it's proven to be flaky
// An attempt to fix this did not lead to any satisfying result
// More info can be found here: https://github.com/xing/hops/pull/760
describe.skip('hot module reload', () => {
  let hopsCli;
  let url;

  beforeAll(async () => {
    hopsCli = HopsCLI.cmd('start').addArg('--fast-dev').run();
    url = await hopsCli.getUrl();
  });

  afterAll(() => {
    hopsCli.stop();
  });

  it('reflects changes automatically', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#one', { timeout: 2000 });

    changeFile('two');
    await page.waitForSelector('#two', { timeout: 10000 });
    await expect(page.$('#one')).resolves.toBeNull();

    changeFile('three');
    await page.waitForSelector('#three', { timeout: 10000 });
    await expect(page.$('#one')).resolves.toBeNull();
    await expect(page.$('#two')).resolves.toBeNull();

    await page.close();
  });

  // test against regression where reloading would not work after changing a file
  // https://github.com/untool/untool/pull/189
  it('allows to reload after a file change', async () => {
    const { page } = await createPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    changeFile('two');
    await page.waitForSelector('#two', { timeout: 10000 });

    await page.reload();
    await page.waitForSelector('#two', { timeout: 10000 });

    changeFile('three');
    await page.waitForSelector('#three', { timeout: 10000 });

    await page.close();
  });
});
