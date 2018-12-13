# Hops Jest Preset

[![npm](https://img.shields.io/npm/v/jest-preset-hops/latest.svg)](https://www.npmjs.com/package/jest-preset-hops)

A [Jest preset](https://facebook.github.io/jest/docs/configuration.html#preset-string) that makes it easier for Hops powered apps to use Jest.

It ensures that Babel works correctly out of the box and that requiring files such as images does not produce errors. [identity-obj-proxy](https://github.com/keyanzhang/identity-obj-proxy) is used to make working with CSS modules easier in tests.

## Installation

```bash
$ yarn add jest-preset-hops
# OR npm install --save jest-preset-hops
```

You also [need to install 'babel-core@^7.0.0-0' as devDependency](https://jestjs.io/docs/en/getting-started#using-babel).

```bash
$ yarn add --dev 'babel-core@^7.0.0-0'
# OR npm install --save --dev 'babel-core@^7.0.0-0'
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
