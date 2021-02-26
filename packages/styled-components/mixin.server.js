import { Mixin } from 'hops-mixin';
import { createElement } from 'react';
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components';

class StyledComponentsMixin extends Mixin {
  constructor(config, element, { styled: options = {} } = {}) {
    super(config);
    this.theme = options.theme || {};
    this.sheet = new ServerStyleSheet();
  }

  enhanceElement(reactElement) {
    return createElement(
      StyleSheetManager,
      { sheet: this.sheet.instance },
      createElement(ThemeProvider, { theme: this.theme }, reactElement)
    );
  }

  getTemplateData(data) {
    return {
      ...data,
      fragments: {
        ...data.fragments,
        headSuffix: data.fragments.headSuffix + this.sheet.getStyleTags(),
      },
    };
  }
}

export default StyledComponentsMixin;
