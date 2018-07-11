# `hops-postcss`

[![npm](https://img.shields.io/npm/v/hops-postcss.svg)](https://www.npmjs.com/package/hops-postcss)

[//]: # 'TODO: add general section about presets, how to install them, how to register them, how to configure them to main Hops readme'

This is a [preset for Hops](https://missing-link-explain-what-are-presets) that, when installed, will enable css loaders for [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env).

### Installation

Just add this preset to your existing Hops React project:

```bash
$ yarn add hops-postcss
# OR npm install --save hops-postcss
```

[//]: # 'TODO: add general section about setting up a basic hops project to main Hops readme'

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://missing-link-explain-quick-start)

### Usage

This preset has no exports and therefore just needs to be installed in order to start writing CSS in external files and have them processed via the PostCSS preset env when importing them.

```css
.headline {
  color: red;
}
```

```javascript
import styles from './styles.css';

export default render(<h1 className={styles.headline}>hello</h1>);
```

Check out this [integration test](https://github.com/xing/hops/tree/next/packages/spec/integration/postcss) as an example for how to use this preset.

### Configuration

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has no runtime configuration options.
