# `hops-styled-components`

[![npm](https://img.shields.io/npm/v/hops-styled-components.svg)](https://www.npmjs.com/package/hops-styled-components)

[//]: # 'TODO: add general section about presets, how to install them, how to register them, how to configure them to main Hops readme'

This is a [preset for Hops](https://missing-link-explain-what-are-presets) that can be used to set up a `<ThemeProvider />` and enable server-side rendering support for [styled-components](https://www.styled-components.com/) in Hops.

### Installation

_This preset must be used together with the `hops-react` preset._

Just add this preset and its peer dependency `styled-components` to your existing Hops React project:

```bash
$ yarn add hops-styled-components styled-components
# OR npm install --save hops-styled-components styled-components
```

[//]: # 'TODO: add general section about setting up a basic hops project to main Hops readme'

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](https://missing-link-explain-quick-start)

### Usage

This preset has no exports and therefore just needs to be installed in order to start using `styled-components` in your app.

Check out this [integration test](https://github.com/xing/hops/tree/next/packages/spec/integration/styled-components) as an example for how to use this preset.

### Configuration

[//]: # 'TODO: link to hops-react render method once readme is completed'

This preset can be configured via the `options` hash passed to [hops-react's render() method](https://missing-link-explain-hops-react-render):

```javascript
const myTheme = { textColor: 'black' };
export default render(<MyApp />, { styled: { theme: myTheme } });
```

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has only a single runtime option which can be passed to the `render()` options inside the `styled` key (see example above).

| Name    | Type     | Default | Required | Description                                                                                                       |
| ------- | -------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `theme` | `Object` | `{}`    | _no_     | A [theme object](https://www.styled-components.com/docs/advanced#theming) for the styled-components ThemeProvider |
