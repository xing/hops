const { Mixin } = require('hops-mixin');
const React = require('react');
const {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} = require('styled-components');

class StyledComponentsMixin extends Mixin {
  constructor(config, element, { styled: options = {} } = {}) {
    super(config);
    this.theme = options.theme || {};
    this.sheet = new ServerStyleSheet();
  }

  enhanceElement(reactElement) {
    return (
      <StyleSheetManager sheet={this.sheet.instance}>
        <ThemeProvider theme={this.theme}>{reactElement}</ThemeProvider>
      </StyleSheetManager>
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

module.exports = StyledComponentsMixin;
