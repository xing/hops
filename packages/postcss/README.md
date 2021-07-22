# `hops-postcss`

[![npm](https://img.shields.io/npm/v/hops-postcss.svg)](https://www.npmjs.com/package/hops-postcss)

**Please see the [main Hops Readme](https://github.com/xing/hops#docs) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) that, when installed, will enable css loaders for [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) with support for [CSS Modules](https://github.com/css-modules/css-modules).

### Installation

Add this preset to your existing Hops React project:

```bash
npm install --save hops-postcss
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### Usage

Since this preset has no configuration, you can start writing CSS in external files and `import` / `require` them in your application code after installing this preset.

```css
.headline {
  color: red;
}
```

```javascript
import styles from './styles.css';

export default render(<h1 className={styles.headline}>hello</h1>);
```

Check out this [integration test](../spec/integration/postcss) as an example for how to use this preset.

#### CSS Modules opt-out

Sometimes it can be necessary to import an external CSS-file without applying CSS Modules to them, to keep their class names intact.

You can opt-out of CSS Modules by importing the respective file with the `global` query parameter.

```js
import 'animate.css/animate.min.css?global';
```

Depending on your ESLint rules, you might need to ignore the import line as there can be issues with the non-standard query parameter.

```js
/* eslint-disable-next-line import/no-unresolved */
import 'animate.css/animate.min.css?global';
```

#### CSS Grid & Autoprefixer

By default CSS Grid properties are not auto-prefixed and there are neither plans to turn on this feature globally in Hops, nor to provide a respective preset option.

Still you can use CSS Grid already by either enabling auto-prefixing on a per-file basis with a comment or for the whole project with an environment variable.

##### Enabling CSS Grid per file

To enable auto-prefixing of CSS Grid properties for a single file, put the following comment at its beginning:

```css
/* autoprefixer grid: autoplace */
```

##### Enabling CSS Grid for the whole project

To enable auto-prefixing of CSS Grid properties for the whole project, pass the environment variable `AUTOPREFIXER_GRID=autoplace` to the build-command:

```sh
AUTOPREFIXER_GRID=autoplace yarn hops build
```

For more information on that topic, please have a look at [the documentation of Autoprefixer](https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie).

### Configuration

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has no runtime configuration options.
