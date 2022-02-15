const path = require('path');
const { promises: fsp } = require('fs');
const { handleConsoleOutput } = require('../../../helpers');

const updateFile = async () => {
  const content = `import React from 'react';

export const Heading = ({ children }) => <h2 className="heading">{children}</h2>;
`;
  const filePath = path.resolve(cwd, 'heading.js');

  await fsp.writeFile(filePath, content, 'utf8');
};

describe('react fast refresh', () => {
  let url;

  beforeAll(async () => {
    const { getUrl, hasFinished } = HopsCLI.start(
      '--fast-dev',
      '--fast-refresh'
    );
    url = await getUrl();
    await hasFinished([
      "bundling 'develop' finished",
      "bundling 'node' finished",
    ]);
  });

  it('renders caption only once', async () => {
    const { page } = await createPage();
    page.on('console', handleConsoleOutput);
    await page.goto(url);
    await page.evaluate(() => {
      window.FOO = 'bar';
    });

    let heading = await page.waitForXPath(
      `//h1[text() = 'Hello Fast Refresh!']`
    );
    let headingHandle = await page.evaluateHandle(
      (elem) => ({
        tagName: elem.tagName.toLowerCase(),
        className: elem.className,
      }),
      heading
    );
    let headingProperties = await headingHandle.jsonValue();
    let arbitraryValue = await page.evaluate('window.FOO');

    expect(headingProperties.tagName).toBe('h1');
    expect(headingProperties.className).toBe('');
    expect(arbitraryValue).toBe('bar');

    await headingHandle.dispose();
    await updateFile();

    heading = await page.waitForXPath(`//h2[text() = 'Hello Fast Refresh!']`, {
      // Don't wait 30 seconds to prove that something is wrong with Fast Refresh
      timeout: 2000,
    });
    headingHandle = await page.evaluateHandle(
      (elem) => ({
        tagName: elem.tagName.toLowerCase(),
        className: elem.className,
      }),
      heading
    );
    headingProperties = await headingHandle.jsonValue();
    arbitraryValue = await page.evaluate('window.FOO');

    expect(headingProperties.tagName).toBe('h2');
    expect(headingProperties.className).toBe('heading');
    expect(arbitraryValue).toBe('bar');

    await headingHandle.dispose();
    await page.close();
  });
});
