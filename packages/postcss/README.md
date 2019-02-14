# `hops-postcss`

[![npm](https://img.shields.io/npm/v/hops-postcss.svg)](https://www.npmjs.com/package/hops-postcss)

**Please see the [main Hops Readme](https://github.com/xing/hops/blob/master/README.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that, when installed, will enable css loaders for [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) with support for [CSS Modules](https://github.com/css-modules/css-modules).

### Installation

Add this preset to your existing Hops React project:

```bash
npm install --save hops-postcss
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://github.com/xing/hops/tree/master#quick-start)

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

Check out this [integration test](https://github.com/xing/hops/tree/master/examples/postcss) as an example for how to use this preset.

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

### Configuration

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has no runtime configuration options.
