const fs = require('fs');
const path = require('path');

function changeFile(id) {
  const content = `
  import { render } from 'hops-react';
  import React from 'react';
  export default render(<h1 id="${id}">hello</h1>);
  `;

  fs.writeFileSync(path.join(global.cwd, 'index.js'), content);
}

describe('hot module reload', () => {
  let url;

  beforeAll(async () => {
    url = await HopsCLI.start();
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
});
