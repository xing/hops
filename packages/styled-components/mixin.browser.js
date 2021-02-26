import { Mixin } from 'hops-mixin';
import { createElement } from 'react';
import { ThemeProvider } from 'styled-components';

class StyledComponentsMixin extends Mixin {
  constructor(config, element, { styled: options = {} } = {}) {
    super(config);
    this.theme = options.theme || {};
  }

  enhanceElement(reactElement) {
    return createElement(ThemeProvider, { theme: this.theme }, reactElement);
  }
}

export default StyledComponentsMixin;
