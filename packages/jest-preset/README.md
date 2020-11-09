# Hops Jest Preset

[![npm](https://img.shields.io/npm/v/jest-preset-hops.svg)](https://www.npmjs.com/package/jest-preset-hops)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

A [Jest preset](https://facebook.github.io/jest/docs/configuration.html#preset-string) that makes it easier for Hops powered apps to use Jest.

It ensures that Babel works correctly out of the box and that requiring files such as images does not produce errors. [identity-obj-proxy](https://github.com/keyanzhang/identity-obj-proxy) is used to make working with CSS modules easier in tests.

## Installation

```bash
npm install --save-dev jest-preset-hops jest babel-jest ts-jest
```

## Usage

Add `jest-preset-hops` as [preset](https://facebook.github.io/jest/docs/en/configuration.html#preset-string) to your Jest config. This can for example be done by adding it to your package.json.

```json
{
  "jest": {
    "preset": "jest-preset-hops"
  }
}
```

Feel free to extend the `"jest"`-configuration object along the way.

For running tests, use the [Jest CLI](https://jestjs.io/docs/en/cli).
