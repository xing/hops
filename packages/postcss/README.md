# `hops-postcss`

[![npm](https://img.shields.io/npm/v/hops-postcss.svg)](https://www.npmjs.com/package/hops-postcss)

This is a [preset for Hops](https://github.com/xing/hops/tree/master#presets) that, when installed, will enable css loaders for [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) with support for [CSS Modules](https://github.com/css-modules/css-modules).

### Installation

Add this preset to your existing Hops React project:

```bash
$ yarn add hops-postcss@next
# OR npm install --save hops-postcss@next
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

Check out this [integration test](https://github.com/xing/hops/tree/master/packages/spec/integration/postcss) as an example for how to use this preset.

### Configuration

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has no runtime configuration options.
