# `hops-typescript`

[![npm](https://img.shields.io/npm/v/hops-typescript.svg)](https://www.npmjs.com/package/hops-typescript)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that can be used to enable [TypeScript](https://www.typescriptlang.org/) support for Hops projects.

## Installation

Add this preset to your existing Hops React project:

```bash
npm install --save hops-typescript typescript
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/master#quick-start)

## Usage

Once this preset is installed and you have a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) in your application root you can start writing your app using TypeScript.

Check out this [integration test](https://github.com/xing/hops/tree/master/packages/spec/integration/typescript) as an example for how to use this preset.

## Configuration

The only required configuration is a `tsconfig.json` in your project root.

This preset contains a [minimal `tsconfig.json`](https://github.com/xing/hops/blob/master/packages/typescript/tsconfig.json) file which we recommend you extend in your `tsconfig.json`:

Example:

```json
{
  "extends": "hops-typescript/tsconfig.json"
}
```

Whether you extend the given TS config or completely provide your own — please take care to not overwrite the properties `compilerOptions.moduleResolution` and `compilerOptions.target`, because those are vital for Hops to work properly!

### Using static assets

While it's a pre-configured feature in Hops to be able to import and make use of `.css`-, `.jpg`-, `.png`-, `.gif`, `.webp`-, `.html`- and `.json`-files, this unfortunately is not supported out-of-the-box in `hops-typescript`. If you try to do this in Typescript the compiler will complain, stating: `Cannot find module '<path to asset file>'.ts (2307)`.

Fortunately there's a way to enable this feature! First of all create a folder `./typings` in the root of your project and put a file named `assets.d.ts` with the following contents into it:

```typescript
declare module '*.jpg';
declare module '*.png';
declare module '*.gif';
declare module '*.webp';
declare module '*.css';
declare module '*.html';
declare module '*.json';
```

Register those typings by defining the [`"typeRoots"`-property](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types) in your `tsconfig.file` like this:

```json
{
  "typeRoots": ["./node_modules/@types", "./typings"]
}
```

Now the Typescript compiler will look at `./node_modules/@types` **and** `./typings` for type declarations. It will — among others — find your declaration file for static asset "modules" and won't complain any longer when you import one of them. Note that by doing it this way every asset import is of type `any`.

Btw: by default the compiler only looks at `./node_modules/@types` for type declarations. Since there's now another location, you can use this to put declarations into the `./typings`-folder for modules that neither bring their own type declarations, nor have typings over at [DefinitelyTyped](http://definitelytyped.org/) (the source off all the `@types/*` modules).

If you want to know more about writing declaration files, [check out the documentation](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

### Preset Options

This preset has no preset configuration options.

### Render Options

This preset has no runtime configuration options.
