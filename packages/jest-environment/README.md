# `jest-environment-hops`

[![npm](https://img.shields.io/npm/v/jest-environment-hops.svg)](https://www.npmjs.com/package/jest-environment-hops)

Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.

> **This package is part of Hops's internal tooling. Hence, it doesn't provide an API contract. Breaking changes may be introduced even with patch releases. Use at your own risk.**

## Installation

```bash
npm install --save-dev jest-environment-hops
```

## Usage

Add `jest-environment-hops` as [`testEnvironment`](https://jestjs.io/docs/en/configuration#testenvironment-string) to your Jest config. This can for example be done by adding it to your package.json.

```json
{
  "jest": {
    "testEnvironment": "jest-environment-hops"
  }
}
```

`jest-environment-hops` launches a [Puppeteer](https://pptr.dev/) instance during the setup-phase by default. Check [the API part of this document](#api), to learn how to interact with the instance.

To disable Puppeteer for a test, add the following code comment to the top of the test file:

```js
/**
 * @jest-hops-puppeteer off
 */
```

## API

The API & certain values are exposed globally in the Jest environment, so there's no need to import anything.

### `cwd: string`

`jest-environment-hops` creates a temporary folder, in which the test runs. `cwd` holds the absolute path of that folder.

### `browser: Puppeteer.Browser | undefined`

The Puppeteer instance, `jest-environment-hops` launches, is exposed via the global `browser`-variable.

In case Puppetteer is disabled via the code pragma `@jest-hops-puppeteer off`, the `browser`-variable's value is `undefined`.

### `HopsCLI.build: (env?: NodeJS.ProcessEnv, ...cliArgs: string[]): Promise<{ stdout: string, stderr: string, error?: Error }>`

Builds the local Hops app into a temporary folder.

```js
const { stderr, error } = await HopsCLI.build('-p');

expect(stderr).toBe('');
expect(error).not.toBeDefined();
```

### `HopsCLI.start: (env?: NodeJS.ProcessEnv, ...cliArgs: string[]): { getUrl: () => Promise<string>, stopServer: () => Promise<void> }`

Starts the local Hops app, so it's possible to visit it with Puppeteer.

```js
const { getUrl, stopServer } = await HopsCLI.start(
  { NODE_ENV: 'testing' },
  '--fast-dev'
);
const url = await getUrl();

// visit URL...

// Stop server explicitly
await stopServer();
```

`stopServer` is exposed for special needs. `jest-environment-hops` takes care of stopping the Hops server, when all tests are done.

### `createPage(): () => Promise<object>`

Convenience function for creating a new `Puppeteer.Page`-instance, which resolves to an object, that holds the `page`-instance and three helper functions.

```js
const {
  page,
  getProperty,
  getInnerText,
  getElementByText,
} = await createPage();
await page.goto('http://localhost:8080/');

const headingClass = await getProperty('className', '.heading');
const headingText = await getInnerText('.heading');
const button = await getElementByText('Submit');
```

### `getProperty: (property: string, selector: string): Promise<string | null>`

Returned by `createPage`. Take a look at [`createPage()`](#createpage---promiseobject) to see a usage example.

### `getInnerText: (selector: string): Promise<string | null>`

Returned by `createPage`. Take a look at [`createPage()`](#createpage---promiseobject) to see a usage example.

### `getElementByText: (text: string): Promise<Puppeteer.ElementHandle>`

Returned by `createPage`. Take a look at [`createPage()`](#createpage---promiseobject) to see a usage example.

Throws an error, when no element has been found.
