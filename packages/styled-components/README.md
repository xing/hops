# `hops-styled-components`

[![npm](https://img.shields.io/npm/v/hops-styled-components.svg)](https://www.npmjs.com/package/hops-styled-components)

**Please see the [main Hops Readme](../../DOCUMENTATION.md) for general information and a Getting Started Guide.**

This is a [preset for Hops](../../DOCUMENTATION.md#presets) that can be used to set up a `<ThemeProvider />` and enable server-side rendering support for [styled-components](https://www.styled-components.com/) in Hops.

### Installation

_This preset must be used together with the `hops-react` preset._

Add this preset and its peer dependency `styled-components` to your existing Hops React project:

```bash
npm install --save hops-styled-components styled-components
```

If you don't already have an existing Hops project read this section [on how to set up your first Hops project.](../../DOCUMENTATION.md#quick-start)

### Usage

After installing this preset you can use `styled-components` in your application.

```javascript
import { render } from 'hops-react';
import styled from 'styled-components';
const Headline = styled.h1`
  color: rebeccapurple;
`;
export default render(<Headline>Hello World!</Headline>);
```

Check out this [integration test](../spec/integration/styled-components) as an example for how to use this preset.

### Configuration

#### Preset Options

This preset has no preset configuration options.

#### Render Options

This preset has only a single runtime option which can be passed to the `render()` options inside the `styled` key (see example below).

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `styled.theme` | `Object` | `{}` | _no_ | A theme object for the styled-components `<ThemeProvider />` |

##### `theme`

In order to use [theming with `styled-components`](https://www.styled-components.com/docs/advanced#theming), this preset wraps your application in a `<ThemeProvider />`.

Example:

```javascript
const myTheme = {
  primaryColor: 'black',
};
export default render(<MyApp />, { styled: { theme: myTheme } });
```
