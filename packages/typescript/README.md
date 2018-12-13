# `hops-typescript`

[![npm](https://img.shields.io/npm/v/hops-typescript/latest.svg)](https://www.npmjs.com/package/hops-typescript)

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that can be used to enable [TypeScript](https://www.typescriptlang.org/) support for Hops projects.

### Installation

Add this preset to your existing Hops React project:

```bash
npm install --save hops-typescript
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/master#quick-start)

### Usage

Once this preset is installed and you have a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) in your application root you can start writing your app using TypeScript.

Check out this [integration test](https://github.com/xing/hops/tree/master/packages/spec/integration/typescript) as an example for how to use this preset.

### Configuration

The only required configuration is a `tsconfig.json` in your project root.

This preset contains a [minimal `tsconfig.json`](https://github.com/xing/hops/blob/master/packages/typescript/tsconfig.json) file which you can extend or overwrite in your tsconfig.json:

Example:

```json
{
  "extends": "./node_modules/hops-typescript/tsconfig.json"
}
```

Unfortunately `"extends"` only supports file relative paths at the moment. See https://github.com/Microsoft/TypeScript/issues/18865 for more information.

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has no runtime configuration options.
