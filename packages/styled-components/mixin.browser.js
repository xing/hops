const { Mixin } = require('@untool/core');
const React = require('react');
const { ThemeProvider } = require('styled-components');

class StyledComponentsMixin extends Mixin {
  constructor(config, element, { styled } = {}) {
    super(config);
    this.theme = styled ? styled.theme : {};
  }

  enhanceElement(reactElement) {
    return <ThemeProvider theme={this.theme}>{reactElement}</ThemeProvider>;
  }
}

module.exports = StyledComponentsMixin;
