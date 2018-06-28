const { Mixin } = require('@untool/core');
const React = require('react');
const { ThemeProvider } = require('styled-components');

class StyledComponentsMixin extends Mixin {
  constructor(config, element, { styled: options = {} } = {}) {
    super(config);
    this.theme = options.theme || {};
  }

  enhanceElement(reactElement) {
    return <ThemeProvider theme={this.theme}>{reactElement}</ThemeProvider>;
  }
}

module.exports = StyledComponentsMixin;
